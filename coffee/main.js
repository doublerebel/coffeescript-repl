// Generated by CoffeeScript 1.3.1
(function() {
  var __slice = [].slice;

  $(function() {
    var $input, $inputcopy, $inputdiv, $inputl, $inputr, $output, $prompt, CoffeeREPL, DEFAULT_LAST_VARIABLE, SAVED_CONSOLE_LOG, log, repl, resizeInput, scrollToBottom;
    SAVED_CONSOLE_LOG = console.log;
    DEFAULT_LAST_VARIABLE = '$_';
    $output = $('#output');
    $input = $('#input');
    $prompt = $('#prompt');
    $inputdiv = $('#inputdiv');
    $inputl = $('#inputl');
    $inputr = $('#inputr');
    $inputcopy = $('#inputcopy');
    CoffeeREPL = (function() {
      var addToHistory, addToSaved, grabInput, handleKeypress, print, processSaved, setPrompt;

      CoffeeREPL.name = 'CoffeeREPL';

      function CoffeeREPL(output, input, prompt, settings) {
        var k, lastVariable, v;
        this.output = output;
        this.input = input;
        this.prompt = prompt;
        if (settings == null) {
          settings = {};
        }
        this.history = [];
        this.historyi = -1;
        this.saved = '';
        this.multiline = false;
        this.settings = lastVariable = DEFAULT_LAST_VARIABLE;
        for (k in settings) {
          v = settings[k];
          this.settings[k] = v;
        }
      }

      print = function(s) {
        if (s == null) {
          s = ' ';
        }
        return this.output[0].innerHTML += "<pre>" + s + "</pre>";
      };

      grabInput = function() {
        var tmp;
        tmp = this.input.val();
        $input.val('');
        return tmp;
      };

      processSaved = function() {
        var compiled, ouput, output, value;
        try {
          compiled = CoffeeScript.compile(saved);
          compiled = compiled.slice(14, -17);
          value = eval.call(window, compiled);
          window[this.settings.lastVariable] = value;
          output = String(value);
        } catch (e) {
          if (e.stack) {
            output = e.stack;
            if (output.split('\n')[0] !== e.toString()) {
              ouput = "" + (e.toString()) + "\n" + e.stack;
            }
          } else {
            output = e.toString();
          }
        }
        this.saved = '';
        return this.print(output);
      };

      setPrompt = function() {
        var s;
        s = this.multiline ? '------' : 'coffee';
        return this.prompt.html("" + s + "&gt;&nbsp;");
      };

      addToHistory = function(s) {
        this.history.unshift(s);
        return this.historyi = -1;
      };

      addToSaved = function(s) {
        this.saved += s.slice(0, -1) === '\\' ? s.slice(0, -1) : s;
        this.saved += '\n';
        return this.addToHistory(s);
      };

      handleKeypress = function(e) {
        var input;
        switch (e.which) {
          case 13:
            e.preventDefault();
            input = this.grabInput();
            this.print(this.prompt.html() + input);
            if (input) {
              this.addToSaved(input);
              if (input.slice(0, -1) !== '\\' && !this.multiline) {
                return this.processSaved();
              }
            }
            break;
          case 27:
            e.preventDefault();
            input = this.input.val();
            if (input && this.multiline && this.saved) {
              input = this.grabInput();
              this.print(this.prompt.html() + input);
              this.addToSaved(input);
              this.processSaved();
            } else if (this.multiline && this.saved) {
              this.processSaved();
            }
            this.multiline = !this.multiline;
            return this.setPrompt;
          case 38:
            e.preventDefault();
            if (this.historyi < this.history.length - 1) {
              this.historyi += 1;
              return this.input.val(this.history[this.historyi]);
            }
            break;
          case 40:
            e.preventDefault();
            if (this.historyi > 0) {
              this.historyI += -1;
              return this.input.val(this.history[this.historyi]);
            }
        }
      };

      return CoffeeREPL;

    })();
    resizeInput = function(e) {
      var content, width;
      width = $inputdiv.width() - $inputl.width();
      content = $input.val();
      content.replace(/\n/g, '<br/>');
      $inputcopy.html(content);
      $inputcopy.width(width);
      $input.width(width);
      return $input.height($inputcopy.height());
    };
    scrollToBottom = function() {
      return window.scrollTo(0, $prompt[0].offsetTop);
    };
    repl = new CoffeeREPL($output, $input, $prompt);
    log = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      SAVED_CONSOLE_LOG.apply(null, args);
      return repl.print(args.join(' '));
    };
    console.log = log;
    $input.keydown(handleKeypress);
    $input.keydown(scrollToBottom);
    $(window).resize(resizeInput);
    $input.keyup(resizeInput);
    $input.change(resizeInput);
    $('html').click(function(e) {
      if (e.clientY > $input[0].offsetTop) {
        return $input.focus();
      }
    });
    resizeInput();
    $input.focus();
    repl.print("// CoffeeScript v1.3.1 REPL");
    repl.print("// https://github.com/larryng/coffeescript-repl");
    repl.print("//");
    repl.print("// Press Esc to toggle multiline mode.");
    return repl.print("// Variable `$_` stores last returned value.");
  });

}).call(this);
