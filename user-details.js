// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

let url=new URL(location.href);
let id=url.searchParams.get('id')

async function fetchData(url){
        try {
                const response = await fetch(url)
                let data = await response.json();
                return data
        }catch (e) {
                console.log(e)
        }
}

let userUrl=`https://jsonplaceholder.typicode.com/users/${id}`;
let postsUrl=`https://jsonplaceholder.typicode.com/users/${id}/posts`;



fetchData(userUrl)

    .then((data => {

        let mainDiv=document.createElement('div');
        mainDiv.classList.add('mainDiv');

        let wrapDiv=document.createElement('div');
        wrapDiv.classList.add('wrapDiv')

        let mainInfo=document.createElement('div');
        mainInfo.classList.add('mainInfo');

        let info=document.createElement('div');
        info.classList.add('info');


        let btnDiv=document.createElement('div');
        btnDiv.classList.add('btnDiv');

        let postsButton=document.createElement('button');
        postsButton.classList.add('postsButton');
        postsButton.innerText='post of current user'.toUpperCase();

        mainInfo.append(btnDiv,info);
        btnDiv.appendChild(postsButton);
        mainDiv.append(wrapDiv,mainInfo);

        function getObject(object){
                explorer(object);

                function explorer(element){
                        for (const value in element) {

                                if(typeof element[value]!=='object'){

                                        let keyValue=document.createElement('p');
                                        keyValue.classList.add('keyValue');
                                        keyValue.innerText=`${value}:${element[value]}`;
                                        wrapDiv.appendChild(keyValue);

                                }else {

                                        let divNestedObject=document.createElement('div');
                                        divNestedObject.classList.add('divNestedObject');
                                        divNestedObject.innerText=`${value}:`;
                                        wrapDiv.appendChild(divNestedObject);

                                        explorer(element[value]);
                                }
                        }
                }
        }
        getObject(data)

            fetchData(postsUrl)
                .then((data=>{
                        postsButton.onclick= function (){

                                for (const post of data) {

                                        let postButton=document.createElement('button');
                                        postButton.innerText='Post Details';

                                        postButton.onclick= function (){

                                                location.href=`post-details.html?id=${id}`

                                        }

                                        let postsDiv=document.createElement('div');
                                        postsDiv.classList.add('postsDiv');
                                        let postsP=document.createElement('p');
                                        postsP.classList.add('postsP');
                                        postsDiv.append(postsP,postButton);
                                        postsP.append(post.title);
                                        info.append(postsDiv)
                                }
                        }
                }))


        document.body.appendChild(mainDiv)
    })).catch((e)=>
        console.log(e))









