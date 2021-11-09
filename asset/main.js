const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('.display');
const renderDisplay = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
    const el = await res.json()
    const html = `
        <div class="col-md-4 mb-4 ">
            <div class="card h-100 m-5 p-3 ">
                <div class="card-body">
                    <div class="post-id d-flex justify-content-end text-primary">
                        <h5>${el.id}</h5>
                    </div>
                    <h5 class="post-title mb-4 fw-bolder ">${el.title}</h5>
                    <p class="post-body mb-5 text-muted" >${el.body}</p>
                    <div class="d-flex justify-content-center mt-5">
                   <button type="button" class="btn btn-link">Read post</button>
                    </div>
                    
                    <div class="d-flex justify-content-start ">
                    <a href="/index.html" class="text-decoration-none fw-bolder ">Go back</a>
                    </div>
                    
                </div>
            </div>
        </div>
        `;
        container.innerHTML = html;
}


window.addEventListener('DOMContentLoaded', ()=>renderDisplay())