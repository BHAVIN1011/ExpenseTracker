/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
// define the application

    var NoteTaker = {};
    (function (app) {
        // variable definitions go here



        var $title = $('#title'),
                $categories = $('#categories'),
                $note = $('#note'),
                $ul = $('#notesList'),
                li = '<li><a href="#pgNotesDetail?title=LINK">ID</a></li>',
                notesHdr = '<li data-role="list-divider">Your Expenses</li>',
                noNotes = '<li id="noNotes">You have no Expenses</li>';
        app.init = function () {
            // stuff in here runs first
            app.bindings();
            // reload the page with your notes load up
            app.checkForNotes();
        };
        app.bindings = function () {
            // set up binding for form
            $('#btnAddNote').on('click', function (e) {
                e.preventDefault();
                // save the note
                app.addNote(
                        $('#categories').val(),
                        $('#title').val(),
                        $('#note').val()

                        );
            });

            $(document).on('click', '#notesList a', function (e) {
                e.preventDefault();
                var href = $(this)[0].href.match(/\?.*$/)[0];
                var title = href.replace(/^\?title=/, '');
                app.loadNote(title);
            });

            // Deleting a note
            $(document).on('click', '#btnDelete', function (e) {
                e.preventDefault();
                var key = $(this).data('href');
                app.deleteNote(key);
            });
        };

        app.getNotes = function () {
            // get notes
            var notes = localStorage['NoteTaker'];
            // convert notes from string to object
            return JSON.parse(notes);
        };

        app.checkForNotes = function () {
            var notes = app.getNotes();
            // are there existing notes?
            if (!$.isEmptyObject(notes)) {
                // yes there are. pass them off to be displayed
                app.displayNotes();
            } else {
                // nope, just show the placeholder
                $ul.html(notesHdr + noNotes).listview('refresh');
            }
        };

        app.displayNotes = function () {
            // get notes
            var notesObj = app.getNotes();
            // create an empty string to contain html
            var html = '';
            var n;
            // loop over notes
            for (n in notesObj) {
                html += li.replace(/ID/g, n.replace(/-/g, ' ')).replace(/LINK/g, n);
            }
            $ul.html(notesHdr + html).listview('refresh');
        };

        app.addNote = function (title, note) {
            // Retrieve the Notekeeper key from localStorage
            var notes = localStorage['NoteTaker'];
            if (notes == undefined || notes == '') {
                var notesObj = {};
            } else {
                var notesObj = JSON.parse(notes)
            }
            //replace any spaces in the title with dashes
            notesObj[title.replace(/ /g, '-')] = note;
            // take our notesObj variable, use stringify() to place into localStorage.
            localStorage['NoteTaker'] = JSON.stringify(notesObj);
            // clear the two form fields
            $note.val('');
            $title.val('');
            $categories.val('');
            //update the listview
            app.displayNotes();
        };

        app.deleteNote = function (key) {
            // get the notes from localStorage
            var notesObj = app.getNotes();
            // delete selected note
            delete notesObj[key];
            // write it back to localStorage
            localStorage['NoteTaker'] = JSON.stringify(notesObj);
            // return to the list of notes
            $.mobile.changePage('#listnotes');
            // restart the storage check
            app.checkForNotes();
        }

        app.loadNote = function (title) {
            // get notes
            var notes = app.getNotes(),
                    // lookup specific note
                    note = notes[title],
                    // define the "new page" template
                    page = ['<div data-role="page" data-url="details" data-add-backbtn="true">',
                        '<div data-role="header">',
                        '<h1>ExpenseTaker</h1>',
                        '<a id="btnDelete" href="" data-href="ID" datarole="button" class="ui-btn-right">Delete</a>',
                        '</div>',
                        '<div data-role="content"><h3>TITLE</h3><p>NOTE</p><p>categories </p> </div>',
                        '</div>'].join(''),
                    newPage = $(page);
            // append it to the page container
            newPage.html(function (index, old) {
                return old
                        .replace(/ID/g, title)
                        .replace(/TITLE/g, title
                                .replace(/-/g, ' '))
                        .replace(/NOTE/g, note)

            }).appendTo($.mobile.pageContainer);

            $.mobile.changePage(newPage);
        };

        app.init();

    })(NoteTaker);
});

