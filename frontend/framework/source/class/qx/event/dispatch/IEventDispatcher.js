/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007 1&1 Internet AG, Germany, http://www.1and1.org

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/* ************************************************************************

#module(event2)

************************************************************************ */

/**
 * All event dispatcher must implement this interface. Event dispatcher must
 * register themselves at the event Manager using
 * {@link qx.event.Manager#registerEventDispatcher}.
 */
qx.Interface.define("qx.event.dispatch.IEventDispatcher",
{
  members:
  {
    /**
     * Whether the dispatcher is responsible for the this event.
     *
     * @param event {qx.event.type.Event} The event object
     * @param type {String} the event type
     * @return {Boolean} Whether the event dispatcher is responsible for the this event
     */
    canDispatchEvent : function(event, type) {
      return event instanceof qx.event.type.Event && typeof type === "string";
    },


    /**
     * This function dispatches the event to the event listeners.
     *
     * @param event {qx.event.type.Event} event object to dispatch
     * @param type {String} the event type
     */
    dispatchEvent : function(event, type) {
      return event instanceof qx.event.type.Event && typeof type === "string";
    }
  }
});