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
                                input.setAttribute('value', tabs[i].getUrl());
                                var span = document.createElement('span');
                                span.textContent = tabs[i].getTitle();
                                div.appendChild(input);
                                div.appendChild(span);
                                document.getElementById('tab1').firstElementChild.appendChild(div);
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
                // kango.console.log(info[i][0]);
                kango.browser.tabs.create({url: info[i][0], focused: false})
            };
            // kango.console.log(info);
        });
    };

    document.getElementById('popup-send').onclick = function() {
        var send_details = {
            method: 'POST',
            url: 'http://localhost:8080/',
            async: true,
            params: {'link': []}, // all values in parameter 'link' will be separated using comma
            contentType: 'json'
        };
        for (var i = 0; i < document.body.firstElementChild.children.length; i++) {
            var child = document.body.firstElementChild.children[i].children[0];
            if (child.checked) {
                send_details['params']['link'].push(child.value);
            };
        };
        // kango.console.log(send_details);
        kango.xhr.send(send_details, function(data) {
            if (data.status == 200 && data.response != null) {
                var text = data.response;
                kango.console.log(text);
            } 
            else {
                kango.console.log('Something went wrong!')
            };
        });
    };

    var theTabs = document.getElementById('Tabs').firstElementChild;
    theTabs.addEventListener("click", tab, false);
    function tab(e) {
        for (var i = theTabs.children.length - 1; i >= 0; i--) {
            document.getElementById(theTabs.children[i].id.slice(3)).style.display = 'none';
            theTabs.children[i].setAttribute("class", "");
        };
        if (e.target !== e.currentTarget) {
            var clickedItemParent = e.target.parentElement;
            document.getElementById(clickedItemParent.id.slice(3)).style.display = 'block';
            clickedItemParent.setAttribute("class", "active");
        }
        e.stopPropagation();
    };

});