let string_search = window.location.search.split('?name=')[1].split('+');
let final_search = '';
if (string_search.length > 1) {
    for (let i = 0; i < string_search.length; i++) {
        const element = string_search[i];
        final_search += (i == (string_search.length - 1)) ? element : element + ' ';
    }
    final_search += '';
} else {
    final_search = string_search[0];
}
$('#search-input').val(final_search);

Reset();

let times = 0;
function convert_to_Html(results = [], will_empty) {
    for (let result in results) {
        let element = results[result];

        let li_element = (element['title']) ? `<li>
        <div class="img">
            ${(element['img']) ? `<img src="${element['img']}" alt="">` : ''}
        </div>
        <div class="id">${document.querySelectorAll('.content li').length}</div>       
        <div class="info">
            <div class="header">
                <h2 class="name" >${element['title']}</h2>
                ${(element['rating']) ? `
                <div class="rating">
                    <span>${element['rating']}</span> / 10
                    <i class="fas fa-star"></i>
                </div>`: ''}
            </div>
            <p class="site">سایت: <a class="en" target="_blank" href="http://${element['site']}">${element['site']}</a></p>
            ${(element['desc']) ? `<p class="desc">توضیحات: <sapn>${element['desc']}</span></p>` : ''}
            ${(element['story']) ? `<p class="story"><span> ${element['story']}</span></p>` : ''}
            ${(element['actors']) ? `<p class="actors">هنرپیشگان : <span> ${element['actors']}</span></p>` : ''}
            <div class="more">
                <a  target="_blank" href="${element['url']}" class="btn btn-blue">بیشتر</a>
            </div>
        </div>
    </li>`: '';
        document.querySelector('.content ul').innerHTML += li_element;
    }
    will_empty.innerHTML = '';
}

function Reset() {
    $('.error p').val('');
    $('.error').removeClass('show');
    $('.not-found').removeClass('show');
    $('.content').removeClass('close');
}

function getResponse(url, indicator = '?s=', type, func) {
    let str = window.location.search.split('?name=')[1];
    $.ajax({
        type: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        url: `${url}/${indicator}${str}`,
        success: function (response) {
            console.log(response);
            loadResponse(response, type, func);
            times++;
            SetOrder(times);
            notFound(times);
            $('.please-wait').addClass('close');
        }, beforeSend: function () {
            $('.please-wait').removeClass('close');
        }, error: function (jqXHR, exception) {
            console.log(jqXHR);
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect. Verify Network';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            times++;
            setError(msg, times);
            $('.please-wait').addClass('close');
        }
    });
}


function getResponsePost(url, datas = {}, type, func) {
    $.ajax({
        type: "POST",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        url: `${url}`,
        data: datas,
        success: function (response) {
            loadResponse(response, type, func);
            times++;
            done(times);
        }, beforeSend: function () {
            $('.please-wait').removeClass('close');
        }, error: function (jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect. Verify Network';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            times++;
            setError(msg, times);
            $('.please-wait').addClass('close');
        }
    });
}

function done(times) {
    notFound(times);
    SetOrder(times);
    if (times == 5) {
        $('.please-wait').addClass('close');
    }
}

function notFound(time) {
    if (time == 5) {
        if (document.querySelectorAll('.content ul li').length === 0 && document.querySelector('.error p').innerText == '') {
            $('.content').addClass('close');
            $('.not-found').addClass('show');
        }
        $('.please-wait').addClass('close');
    }
}

function setError(msg, times) {
    if (times == 5) {
        let error_element = document.querySelector('.error p');
        error_element.innerText = msg;
        $('.error').addClass('show');
        $('.content').addClass('close');
        $('.please-wait').addClass('close');
    }
}

function loadResponse(response, type, func) {
    let create_element = document.createElement('div');
    create_element.className = type;
    create_element.innerHTML = response;
    func(create_element);
}


function objectifier(title, img, rating, desc, url, story, actors, site) {
    let objectify = { 'title': title, 'img': img, 'rating': rating, 'url': url, 'story': story, 'desc': desc, 'actors': actors, 'site': site };
    return objectify;
}

function setTitle(title_element) {
    if (title_element && typeof (title_element) == 'object') {
        if (title_element.innerText) {
            return title_element.innerText;
        } else {
            return null;
        }
    }
    return null;
}

function setImg(img_element, type = 'src') {
    if (img_element && typeof (img_element) == 'object') {
        if (img_element.getAttribute(type)) {
            return img_element.getAttribute(type);
        }
        return null;
    }
    return null;
}

function setRating(rating_element) {
    if (rating_element && typeof (rating_element) == 'object') {
        if (rating_element.innerText) {
            return rating_element.innerText;
        } else {
            return null;
        }
    }
    return null;
}

function setExtraInfo(extra_element, type = 'inner') {
    if (typeof (extra_element) == 'object') {
        if (Array.isArray(extra_element)) {
            let toghether = null;
            for (let i = 0; i < extra_element[0].length; i++) {
                let element = extra_element[0][i];
                let data = (type == 'inner') ? element.innerText : element.getAttribute(type);
                if (data) {
                    if (i == 0) {
                        toghether = '';
                    }
                    toghether += (i == (extra_element[0].length - 1)) ? data.trim() : data.trim() + ' , ';
                }
            }
            return toghether;
        } else {
            let data = (type == 'inner') ? extra_element.innerText : extra_element.getAttribute(type);
            if (data) {
                return data;
            }
            return null;
        }
    }
    return null;
}

function setUrl(url_element) {
    if (url_element && typeof url_element == 'object') {
        if (url_element.getAttribute('href')) {
            return url_element.getAttribute('href');
        }
        return null;
    }
    return null;
}

function setStory(story_element) {
    if (story_element && typeof story_element == 'object') {
        if (story_element.innerText) {
            return String(story_element.innerText).substring(0, 300) + ' ...';
        }
        return null;
    }
    return null;
}

function setActors(actors_element) {
    if (actors_element && typeof actors_element == 'object') {
        if (Array.isArray(actors_element)) {
            let toghether = null;
            for (let i = 0; i < actors_element[0].length; i++) {
                let actor = actors_element[0][i];
                if (actor.innerText) {
                    if (i == 0) {
                        toghether = '';
                    }
                    toghether += (i === (actors_element[0].length - 1)) ? actor.innerText.trim() : actor.innerText.trim() + ' , ';
                }
            }
            return toghether;
        }
        if (actors_element.innerText) {
            return actors_element.innerText.replaceAll('\n', '').replaceAll('\t', '').trim().split('ستارگان : ')[1];
        }
        return null;
    }
    return null;
}

