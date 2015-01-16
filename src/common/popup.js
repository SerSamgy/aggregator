// ==UserScript==
// @name Aggregator
// @include http://*
// @include https://*
// /==UserScript==

KangoAPI.onReady(function() {
	// kango.browser.tabs.getAll(function(tabs) {
        kango.browser.windows.getCurrent(function(win) {
                win.getTabs(function(tabs) {
                        // var ul = document.createElement("ul");
                        for(var i = 0; i < tabs.length; i++) {
                                var div = document.createElement('div');
                                div.setAttribute('id', i);
                                var input = document.createElement('input');
                                input.setAttribute('type', 'checkbox');
                                input.setAttribute('id', tabs[i].getId());
                                var span = document.createElement('span');
                                span.textContent = tabs[i].getTitle();
                                div.appendChild(input);
                                div.appendChild(span);
                                document.body.firstElementChild.appendChild(div);
                        	// var li = document.createElement("li");
                        	// li.textContent = tabs[i].getTitle();
                         //        ul.appendChild(li);
                                // kango.console.log(tabs[i].getUrl());
                        }
                        // document.body.appendChild(ul);
                });
	});

    document.getElementById('popup-get').onclick = function() {
        var get_details = {
            url: 'http://localhost:8080/',
            method: 'GET',
            async: false,
            contentType: 'json'
        };
        kango.xhr.send(get_details, function(data) {
            var info = data.response;
            for (var i = info.length - 1; i >= 0; i--) {
                kango.console.log(info[i][0]);
                kango.browser.tabs.create({url: info[i][0], focused: false})
            };
            // kango.console.log(info);
        });
    };

});

// for (i=0; i<document.body.firstElementChild.children.length; i++) {console.log(document.body.firstElementChild.children[i].children[0].checked)}