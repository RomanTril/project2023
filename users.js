// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

async function fetchData(url){
    try {
        const response = await fetch(url)
        let data = await response.json();
        return data
    }catch (e) {
        console.log(e)
    }
}

const usersUrl='https://jsonplaceholder.typicode.com/users';

fetchData(usersUrl)

    .then((data)=>{

        let usersDiv = document.createElement('div');
        usersDiv.classList.add('usersDiv');

       for (let user of data) {

           let userInnerDiv=document.createElement('div');
           userInnerDiv.classList.add('userInnerDiv');

           let h2Users=document.createElement('h2');
           h2Users.classList.add('h2Users');
           h2Users.innerText=`${user.id}-${user.name}`;

           let btnUsers=document.createElement('button');
           btnUsers.classList.add('btnUsers');
           btnUsers.innerText='User Details';

           userInnerDiv.append(h2Users,btnUsers);
           usersDiv.appendChild(userInnerDiv);

           btnUsers.onclick=function (){

               location.href=`users-details.html?id=${user.id}`
               localStorage.setItem('user',JSON.stringify(user))
           }
       }
       document.body.appendChild(usersDiv);
   }).catch((e)=>
    console.log(e))


