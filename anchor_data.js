/**
 * Anchor Data
 * Use anchor as query string
 *
 * @author Gabriel Corado
 * @version 1.0.0
 */

(function(){
  /*
   * @constructor
   * @return {Data}         Returns object instance
   */
  var Data = function() {
    /*
     * Delimiter
     * @var
     */
    var delimiter = '&';

    /*
     * Value delimiter
     * @var
     */
    var valueDelimiter = '=';

    /*
     * Page hash
     * @var
     */
    this.hash = document.location.hash;

    /*
     * Data
     * @var
     * @private
     */
    var data = {};

    /*
     * Events
     * @var
     * @private
     */
    var events = {};

    /*
     * Create a event
     * @funciton
     * @private
     * @param {String} name         Event name
     */
    var createEvent = function(name) {
      if (document.createEvent) {
        events[name] = document.createEvent("HTMLEvents");
        events[name].initEvent(name, true, true);
      } else {
        events[name] = document.createEventObject();
        events[name].eventType = name;
      }

      events[name].eventName = name;
    }


    /*
     * Trigger event
     * @function
     * @private
     * @param {String} name         Event name
     * @param {Object} data         Event data
     */
    var eventTrigger = function(name, data) {
      // Duplicate event
      var e = events[name];

      // Set event data
      if( data != undefined && typeof data == 'object' ) {
        for( var _key in data )
          e[_key] = data[_key];
      }

      // Dispatch event
      if (document.createEvent)
        window.dispatchEvent(e);
      else
        window.fireEvent('on' + e.eventType, e);
    }

    // Create events
    createEvent('dataUpdated');
    createEvent('dataInserted');
    createEvent('dataRemoved');

    /*
     * Update data object based on hash
     * @funciton
     */
    this.updateData = function() {
      // Get hashes
      var hashes = this.hash.substring(1).split(delimiter);

      if( hashes != '' ) {

        // Each hashes
        for( var i = 0; i < hashes.length; i++ ) {
          // Breaks with value delmiter
          var hash = hashes[i].split(valueDelimiter);

          // Set in data Object
          data[hash[0]] = hash[1];
        }
      }

      // Trigger Event
      eventTrigger('dataUpdated');
    }

    /*
     * Update object on hash changes
     * @function
     */
    this.hashUpdated = (function() {
      // Define AnchorData instance
      var _this = this;

      // Return method
      return function() {
        _this.hash = document.location.hash;
        _this.updateData();
      }
    }).call(this);

    // Delegate event hash change
    window.addEventListener('hashchange', this.hashUpdated);

    // First data
    this.updateData();

    /*
     * Generate hash
     * @function
     * @private
     */
    this.generateHash = function() {
      // hashes and scroll top value
      var hashes = [],
          scrollTop = document.body.scrollTop;

      // Each data
      for( var _key in data ) {
        // Checks values and add to hashes
        if( data[_key] != undefined )
          hashes.push( _key + valueDelimiter + data[_key] );
        else
          hashes.push( _key );
      }

      // Set new hash
      document.location.hash = hashes.join( delimiter );

      // scroll block
      document.body.scrollTop = scrollTop;
    }

    /*
     * Checks key in hash
     * @function
     * @param {String} key            Data Key
     * @return {Boolean}              If exists or not
     */
    this.hasKey = function(key) {
      // Each data
      for( var _key in data ) {
        // has key
        if( _key == key )
          return true;
      }

      // No keys founded
      return false;
    }

    /*
     * Insert new value into data
     * @function
     * @param {String} key            Data Key
     * @param {String} value          Data value
     */
    this.insert = function() {
      var key = arguments[0],
          value = arguments[1];

      // Checks Key
      if( key == undefined || key == '' )
        throw 'data key cannot be blank.'

      // Insert
      data[key] = value;

      // Trigger Event
      eventTrigger('dataInserted', {key: key});

      // Generate hash
      this.generateHash();
    }

    /*
     * Remove data value
     * @function
     * @param {String} key          Data Key
     */
    this.remove = function(key) {
      // Checks Key
      if( key == undefined || key == '' )
        throw 'data key cannot be blank.'

      // Checks if exists
      if( this.hasKey(key) ) {
        // Remove
        delete data[key];

        // Trigger Event
        eventTrigger('dataRemoved', {key: key});
      }

      // Generate hash
      this.generateHash();
    }

    /*
     * Get data value
     * @function
     */
    this.get = function(key) {
      // Checks Key
      if( key == undefined || key == '' )
        throw 'data key cannot be blank.'

      // Checks if exists
      if( this.hasKey(key) ) {
        if( data[key] != undefined )
          return data[key];
        else
          return true;
      } else {
        return false;
      }
    }

    // Return Object instance
    return this;
  }

  // Initializer AnchorData
  window.AnchorData = new Data();
}).call(this);
