var App = {};
    App.utils = {};
	App.utils.getXMLHttpRequest = function(){
		if (window.XMLHttpRequest){
			try{
				return new XMLHttpRequest();
			} 
			catch (e){}
		} 
		else if (window.ActiveXObject){
			try 
			{
				return new ActiveXObject('Msxml2.XMLHTTP');
			} catch (e){}
			try 
			{
				return new ActiveXObject('Microsoft.XMLHTTP');
			} 
			catch (e){}
		}
		return null;
	}

	App.utils.on = function(obj, event, fn){
	  if (obj.addEventListener) {
	    obj.addEventListener(event, fn, false);
	    return true;
	  } 
	  else if (obj.attachEvent) {
	    return obj.attachEvent('on' + event, fn);
	  }
	}
