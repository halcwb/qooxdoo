#!/usr/bin/env python

# BAT Client - qooxdoo platform-independent Build And Test client

import os, sys, platform
import optparse
import xmlrpclib

clientconf = {
   'bathost'   : '172.17.12.117',
   'batport'   : 8000,
   'platform'  : 'unix',
   'pack_type' : 'sdk',
   'make_build': False,
   'work_dir'  : '/tmp/qx',
   'logfile'   : 'bat_client.log',
   #'disk_space' : '2G',
   #'cpu_consume' : '20%',
   #'time_limit' : '30m',
}
doCleanup = False


def get_computed_conf():
    parser = optparse.OptionParser()

    parser.add_option(
        "-w", "--work-dir", dest="workdir", default=clientconf['work_dir'], type="string",
        help="Directory for dowloading, unpacking and running the work pack"
    )

    parser.add_option(
        "-p", "--bat-port", dest="batport", default=clientconf['batport'], type="string",
        help="Port of BAT host to connect to"
    )

    parser.add_option(
        "-c", "--clean-up", dest="cleanup", default=doCleanup, action="store_true",
        help="Remove all files after test run"
    )

    parser.add_option(
        "-l", "--log-file", dest="logfile", default=clientconf['logfile'], type="string",
        help="Name of log file"
    )

    parser.add_option(
        "-t", "--bat-host", dest="bathost", default=clientconf['bathost'], type="string",
        help="The BAT host to connect to"
    )

    (options, args) = parser.parse_args()

    return (options, args)


def register_client():
    (jobid,workpack_url,workpack_opts) = server.register_client(clientconf)
    return (jobid,workpack_url, workpack_opts)

def retreive_workpack(wp_url):
    import httplib, urlparse
    urlparts = urlparse.urlsplit(wp_url)
    httpServ = httplib.HTTPConnection(urlparts.hostname, urlparts.port)
    httpServ.connect()

    httpServ.request('GET',urlparse.urlunsplit(('','')+urlparts[2:])) # wp_url - 'http://...:8000'
    resp = httpServ.getresponse()
    if resp.status != httplib.OK:
        raise "Unable to download package at " + wp_url + " (HTTP: " \
              + repr(resp.status) + ")"
    else:
        file = open(os.path.basename(urlparts[2]), 'wb') # basename(wp_url)
        file.write(resp.read())
        file.close()

    return (os.path.basename(urlparts[2])) # basename(wp_url)

def goto_workdir(workdir):
    if not os.path.exists(workdir):
        os.mkdir(workdir)
    os.chdir(workdir)

def run_workpack(wp,wo):
    rc = invoke_external("python %s" % reduce(lambda a,b: a+" "+b,[wp]+wo))
    return rc

def prepare_output(logfile):
    # redirect std streams, also for child processes
    global sold, eold
    if (logfile != None):
        sold = sys.stdout
        eold = sys.stderr
        sys.stdout = open(logfile, 'w')
        sys.stderr = sys.stdout

def invoke_external(cmd):
    import subprocess
    p = subprocess.Popen(cmd, shell=True,
                         stdout=sys.stdout,
                         stderr=sys.stderr)
    return p.wait()

def report_outcomes(jobid,ret,logfile):
    #lfile = open(logfile,'rU')
    #logcont = lfile.read()
    logcont = ""
    rc = server.receive_report(jobid,repr(ret)+logcont)
    return rc

def main():
    global server, options, args

    (options,args) = get_computed_conf()
    goto_workdir(options.workdir)
    prepare_output(options.logfile)
    server = xmlrpclib.ServerProxy(uri='http://'+options.bathost+':'+repr(options.batport),allow_none=True)
    (jobid,workpack_url, workpack_opts) = register_client()
    workpack = retreive_workpack(workpack_url)
    ret = run_workpack(workpack,workpack_opts)
    report_outcomes(jobid, ret, os.path.join(options.workdir,options.logfile))


if __name__ == "__main__":
    main()
