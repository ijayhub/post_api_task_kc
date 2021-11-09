let postTitle = document.querySelector('#post-title');

let postBody = document.querySelector('#post-body');
let postForm = document.querySelector('#post-form');
let userPost = [];


 postForm.addEventListener('submit',createPost)

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then((data)=>{
       let postLayout = document.querySelector('#post-layout');
         userPost = data;
    //    console.log(userPost)
       let html = "";
       userPost.forEach(el => {
        
           html += `  
           <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="post-id d-flex justify-content-end text-primary">
                            <h5>${el.id}</h5>
                        </div>
                        <h5 class="post-title mb-4">${el.title}</h5>
                        <p class="post-body mb-5" >${el.body}</p>
                        <div class ="d-flex justify-content-end mb-3">
                            <button class="post-btn btn btn-outline-warning">update post</button>
                        </div>
                        <div class ="d-flex justify-content-end ">
                         <a href="display.html?id=${el.id}"target="_blank"><button class="post-btn btn btn-outline-primary">click post</button></a>
                        </div>
                        
                        
                    </div>
                </div>
            </div>

           `;
           postLayout.innerHTML = html;
       });
    })
}
getPosts();

function createPost(e) {
    e.preventDefault();
    let pTitle = postTitle.value;
    
    let pBody = postBody.value;
    // console.log('post-Title:', pTitle)
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method:'POST',
        body:JSON.stringify({
            title: pTitle,
            body: pBody,
            userId:0
            
        }),
        headers:{
            'content-type': 'application/JSON; charset=UTF-8',
        },
        
    })
    .then((response)=>response.json())
    .then((data)=>{
        
       
        
    //   console.log("POST", data);
    //   console.log(userPost)
      userPost.push(data)
    //   console.log(userPost);
      let postLayout = document.querySelector("#post-layout");
      let html = "";
      userPost.forEach(el => {
        html += `  
           <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="post-id d-flex justify-content-end text-primary">
                            <h5>${el.id}</h5>
                        </div>
                        <h5 class="post-title mb-4" id="my-post-title">${el.title}</h5>
                        <p class="post-body mb-5" id="my-post-body" >${el.body}</p>

                        <div class ="d-flex justify-content-end mb-3">
                        <button class="post-btn btn btn-outline-warning" onClick="updatePost(${el.id})">update post</button>
                        </div>
                        <div class ="d-flex justify-content-end">
                         <a href="display.html ?id=${el.id}" target="_blank"><button class="post-btn btn btn-outline-primary">click post</button></a>
                        </div>
                    </div>
                </div>
            </div>

           `;
        postLayout.innerHTML = html;
       });
      
      alert('post created successful')
    })
     
    
    
}
function updatePost(postId) {
    console.log(postId)
    let pTitle = postTitle.value;

    let pBody = postBody.value;
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "PUT",
        body: JSON.stringify({
            id:postId,
            title: pTitle,
            body:pBody,
            userId:1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) =>{
            console.log(data);
            let myPostTitle = document.querySelectorAll('.post-title')
            // console.log(myPostTitle)
            // myPostTitle.innerHTML = data.title
            let myPostBody = document.querySelectorAll(".post-body");
            // console.log(myPostTitle);
            myPostTitle.forEach((title, index)=>{
                if(index + 1 === postId) {
                    title.textContent = data.title;
                }
            })
            myPostBody.forEach((body,index)=>{
                if(index + 1 === postId) {
                    body.textContent = data.body
                }
            })
        

        })
            .catch((err) => {
                console.log(err)
        });

       
} 
        
        

  
  