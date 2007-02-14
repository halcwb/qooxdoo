qx.Clazz.define("qx.test.Cat",
{
  extend : qx.test.Animal,

  construct : function()
  {
    arguments.callee.base.call(this);

    this.debug("Static property: " + arguments.callee.self.static_prop1);
  },

  statics :
  {
    static_prop1 : 3.141
  },

  properties :
  {
    color : {
      compat : true,
      type : "string",
      defaultValue : "brown"
    }
  },

  members :
  {
    name : "",

    /** This is the documentation for the makeSound function */
    makeSound : function() {
     this.debug("MEOW! MEOW!");
    },

    /** This is the documentation for the play function */
    play : function()
    {
      this.debug("Don't know how to play! (" + arguments.callee.self.static_prop1 + ")");
      this.debug("Don't know how to play! (" + this.self(arguments).static_prop1 + ")");
    }
  }
});
