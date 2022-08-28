$("#form").submit(function(event) {
    event.preventDefault()

    var perPage = 12
    var key = "563492ad6f917000010000018b5d365eaa3746ac8c1e6061a22b2850"

    $("#result").empty()

    $.ajax({
        method:'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", key)
        },
        url: "https://api.pexels.com/v1/search?query="+$("#search").val()+"&per_page="+perPage,
        success: function (data) {
            console.log(data)

            photos = data.photos

            for (var index = 0; index < photos.length; index++) {
                photo = `
                <div class="card">
                    <img 
                        width="50%" 
                        height="50%" 
                        src="${photos[index].src.medium}" 
                        class="card-img-top"/>
                    <div class="card-body">
                        <h5>
                            <u>${photos[index].alt}</u>
                        </h5>
                        <p class="card-text"> Photographer: ${photos[index].photographer} </p>
                        <hr class="solid">
                        <a href="${photos[index].photographer_url}" class="card-link"> Photographer </a>
                        <a href="${photos[index].url}" class="card-link"> Photo </a>
                    </div>
                </div>`

                $("#result").append(photo)
            }
        },
        error: function(error) {
            console.log(error)
        }
    })
})