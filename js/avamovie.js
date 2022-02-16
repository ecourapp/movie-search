// Zar film

AvaMovie();

function AvaMovie() {
    const url = 'https://avamovie1.xyz';
    getResponse(url, '?s=', 'avamovie', function (create_element) {
        let objected_list = set_avamovie_attributes(create_element);
        if (objected_list) {
            convert_to_Html(objected_list, create_element);
        }
    });
}

function set_avamovie_attributes(element) {
    if (typeof (element) == 'object') {
        let items = element.querySelectorAll('article.postItems');
        let final_items = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let actors = setActors((item.querySelectorAll('.fm-infos')[6]) ? Array(item.querySelectorAll('.fm-infos')[6].querySelectorAll('a')) : Array(item.querySelectorAll('.fm-infos')[5].querySelectorAll('a')));
            let title = setTitle(item.querySelector('.tag-h a'));
            let img = setImg(item.querySelector('.imgWrapper a img'));
            let rating = setRating(item.querySelector('.rate'));
            let site = 'avamovie1.xyz';
            let desc = null;
            let url = setUrl(item.querySelector('.read-more-link'));
            let story = setStory(item.querySelector('.postPlot'));
            let objectify = objectifier(title, img, rating, desc, url, story, actors, site);
            final_items.push(objectify);
        }
        return final_items;
    }
    return null;
}

