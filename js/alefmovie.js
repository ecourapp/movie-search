// Zar film

AlefMovie();

function AlefMovie() {
    const url = 'https://alefmovies.xyz/wp-admin/admin-ajax.php';
    getResponsePost(url, {
        'keyword': window.location.search.split('?name=')[1],
        'action': 'ajaxMovieSearch'
    }, 'alefmovie', function (create_element) {
        let objected_list = set_alefmovie_attributes(create_element);
        if (objected_list) {
            convert_to_Html(objected_list, create_element);
        }
    });
}

function set_alefmovie_attributes(element) {
    if (typeof (element) == 'object') {
        let items = element.querySelectorAll('a');
        let final_items = [];
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let actors = null;
            let title = setTitle(item.querySelector('.info p'));
            let img = setImg(item.querySelector('.thumb img'));
            let rating = null;
            let site = 'alefmovies.xyz';
            let desc = null;
            let url = setUrl(item);
            let story = null;
            let objectify = objectifier(title, img, rating, desc, url, story, actors, site);
            final_items.push(objectify);
        }
        return final_items;
    }
    return null;
}

