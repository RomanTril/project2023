// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

let url =new URL(location.href);
let id=url.searchParams.get('id');

async function fetchData(url){
    try {
        const response = await fetch(url)
        let data = await response.json();
        return data
    }catch (e) {
        console.log(e)
    }
}

let postUrl=`https://jsonplaceholder.typicode.com/posts/${id}`;
let commentsUrl=(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)



fetchData(postUrl)

    .then((data=>{

        let comment=document.createElement('button');
        comment.classList.add('comment');
        comment.innerText='Comment';

        let commentsDiv=document.createElement('div');
        commentsDiv.classList.add('commentsDiv');

        let wrap=document.createElement('div');
        wrap.classList.add('wrap');

        let commentDiv=document.createElement('div');
        commentDiv.classList.add('commentDiv');

        commentsDiv.appendChild(comment);

        for (const value in data) {

            let valueDiv=document.createElement('div');
            valueDiv.append(`${value}:${data[value]}`);
            wrap.appendChild(valueDiv);
        }

        comment.onclick=function (){

            fetchData(commentsUrl)

                .then((data=>{
                    for (const item of data) {
                        let itemDiv=document.createElement('div');

                        itemDiv.append(item.body);

                        commentDiv.appendChild(itemDiv);

                    }
                }))
        }
        document.body.append(wrap,commentsDiv,commentDiv);
    })).catch((e)=>console.log(e))




