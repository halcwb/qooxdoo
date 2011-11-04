/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Gabriel Munteanu (gabios)

************************************************************************ */

/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 *
 * This class blocks events and can be included into all widgets.
 *
 */
qx.Class.define("qx.ui.mobile.dialog.Dialog",
{
  extend : qx.ui.mobile.dialog.Popup,

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    defaultCssClass :
    {
      refine : true,
      init : "dialog"
    },
    
    modal :
    {
      init : true,
      check : "Boolean",
      nullable: false
    }

  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
  
    __blocker : false,
    
    
    show : function()
    {
      if(this.getModal())
      {
        this.__getBlocker().show();
      }
      this.base(arguments);
    },
    
    __getBlocker : function()
    {
      if(!this.__blocker) {
        this.__blocker = new qx.ui.mobile.core.Blocker();
        this.__blocker.addCssClass('transparent');
        qx.core.Init.getApplication().getRoot().add(this.__blocker);
        var blockerZIndex = qx.bom.element.Style.get(this.__blocker.getContainerElement(), 'zIndex');
        blockerZIndex = parseInt(blockerZIndex) +1;
        qx.bom.element.Style.set(this.getContainerElement(), 'zIndex', blockerZIndex);
      }
      return this.__blocker;
    },

    /**
     * Hides the blocker. The blocker is only hidden when the hide method
     * is called as many times as the {@link #show} method.
     */
    hide : function()
    {
      if(this.getModal())
      {
        this.__getBlocker().hide();
      }
      this.base(arguments);
    }

  }

});