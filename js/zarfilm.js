// Zar film

ZarFilm();

function ZarFilm() {
    const url = 'https://myzarfilm.date';
    getResponse(url, '?s=', 'zarfilm', function (create_element) {
        let objected_list = set_zarfilm_attributes(create_element);
        if (objected_list) {
            convert_to_Html(objected_list, create_element);
        }
    });
}

function set_zarfilm_attributes(element) {
    if (typeof (element) == 'object') {
        let items = element.querySelectorAll('.sitePost');
        let final_items = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let actors = setActors((item.querySelectorAll('.sitePost__listItem')[3]) ? item.querySelectorAll('.sitePost__listItem')[3] : item.querySelectorAll('.sitePost__listItem')[2]);
            let title = setTitle(item.querySelector('.title a'));
            let img = setImg(item.querySelector('.sitePost__cover a img'));
            let rating = setRating(item.querySelector('.rate'));
            let site = 'myzarfilm.date';
            let desc = setExtraInfo(item.querySelectorAll('.siteSuggestion__postsItem__coverSpan'));
            let url = setUrl(item.querySelector('.more a'));
            let story = setStory(item.querySelector('.plot'));
            let objectify = objectifier(title, img, rating, desc, url, story, actors, site);
            final_items.push(objectify);
        }
        return final_items;
    }
    return null;
}

