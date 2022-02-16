// word.match(/^[A-Za-z][A-Za-z0-9]*$/)
function SetOrder(times) {
    let new_list = [];
    if (times === 5) {
        let old_list = document.querySelectorAll('.content ul li');
        let list = titleBase(new_list, old_list);
        setInContent(list);
    }

    function titleBase(new_list, old_list) {
        for (let i = 0; i < old_list.length; i++) {
            let element = old_list[i];
            let title = element.querySelector('.name').innerText;
            new_list = equal(element, title, new_list);
        }
        for (let x = 0; x < old_list.length; x++) {
            const element = old_list[x];
            let title = element.querySelector('.name').innerText;
            new_list = include_str(element, title, new_list);
        }
        for (let x = 0; x < old_list.length; x++) {
            const element = old_list[x];
            new_list = pushRest(element, new_list);
        }
        return new_list;
    }

    function equal(element, title, new_list) {
        let first_en = getFirstEnWord(title);
        let search_str = 'fight'.toLowerCase();
        if (first_en == search_str) {
            if (includes_item(element, new_list) === false) {
                new_list.splice(new_list.length, 0, element);
            }
        }
        return new_list;
    }

    function pushRest(element, new_list) {
        if (includes_item(element, new_list) === false) {
            new_list.splice(new_list.length, 0, element);
        }
        return new_list;
    }

    function include_str(element, title, new_list) {
        let search_str = 'fight'.toLowerCase();
        let en_words = getEnWords(title);
        for (let z = 0; z < en_words.length; z++) {
            const en_word = en_words[z];
            if (en_word.search(search_str) == 0) {
                if (includes_item(element, new_list) === false) {
                    new_list.splice(new_list.length, 0, element);
                }
            }
        }
        return new_list;
    }

    function includes_item(item, new_list) {
        let has_it = false;
        for (let i = 0; i < new_list.length; i++) {
            let element = new_list[i];
            if (parseInt(element.querySelector('.id').innerText) === parseInt(item.querySelector('.id').innerText)) {
                has_it = true;
            }
        }
        return has_it;
    }

    function getFirstEnWord(str) {
        let space_split = str.split(' ');
        for (let i = 0; i < space_split.length; i++) {
            const word = space_split[i];
            if (word.match(/^[A-Za-z][A-Za-z0-9]*$/) && word.match(/^[A-Za-z][A-Za-z0-9]*$/).length > 0) {
                return word.toLowerCase();
            }
        }
        return null;
    }

    function getEnWords(str) {
        let space_split = str.split(' ');
        let list = [];
        for (let i = 0; i < space_split.length; i++) {
            const element = space_split[i];
            if (isEn(element)) {
                list.push(element.toLowerCase());
            }
        }
        return list;
    }

    function isEn(word) {
        if (word.match(/^[A-Za-z][A-Za-z0-9]*$/) && word.match(/^[A-Za-z][A-Za-z0-9]*$/).length > 0) {
            return true;
        }
        return null
    }

    function setInContent(new_list) {
        let content_ul = document.querySelector('.content ul');
        content_ul.innerHTML = '';
        for (let i = 0; i < new_list.length; i++) {
            const element = new_list[i];
            content_ul.appendChild(element);
        }
    }

}