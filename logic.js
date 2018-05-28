

let selectedVal,apiKey,option,optionValue,i=0;

$(document).ready(()=>{


	$('.scrollClass').css("height",$('#responseList').height())
	$('.imgHeight').css("height",$('#responseList').height())

	setInterval(()=>{
		$('#navEffect').effect("explode","slow")
		$('#appTitle').effect("slide","slow")
	},1500)

	$('.dropdown-item').click(function(){
		selectedVal= $(this).text()
		$('#searchItem').attr("value",selectedVal)
		$('#searchValue').val("")
		if(selectedVal=="Title") {
			$('#searchValue').attr("placeholder","Please enter the Title")
			option="t"
			$(()=> {
				let availableTags = [
				"Deadpool",
				"Guardians of the Galaxy Vol. 2",
				"Minions",
				"Titanic",
				"Doctor Strange",
				"The Avengers",
				"Pirates",
				"Dark Knight",
				"Avatar",
				"Inception",
				"Logan",
				"Brave Heart"
				];
				$( "#searchValue" ).autocomplete({
					source: availableTags
				});
			} );
		} else if(selectedVal=="IMDB Id") {
			$('#searchValue').attr("placeholder","Please enter the IMDB Id")
			option="i"
		}

	})

	$('#goButton').click((e)=>{
		if($('#searchValue').val() && $('#searchItem').val()) {
			apiKey = prompt("Please Enter your Key")
			if(apiKey !== "") 
				getMovieData()
			else{
				alert("Enter the apiKey")
			}
		} else {

			alert("Please enter the details")		
		}

	})

})


let getMovieData =()=>{ 
	optionValue = $('#searchValue').val()	
	$.ajax({
		type:'GET',
		dataType:'json',
		async:true,
		url:'http://www.omdbapi.com/?'+option+'='+optionValue +'&apikey='+apiKey,
		success:(response)=>{
			if(response.Response !=="False") {

				$('.movieNotfound').css("visibility","hidden")
				$('.movieResponse').css("visibility","visible")
				console.log(response)
				// <!-- Movie Responseeeeeeeeeeeee -->
				if(response.Poster !=="N/A"){
					$('.imgHeight').attr("src",response.Poster)
					$('.figure-caption').attr("value","hiiii")
				} else {
					$('.imgHeight').attr("src","images/posterDefault.jpg")
					$('.figure-caption').attr("value","hiiii")
				}
				$('.scrollClass').html(
					`<h4 id="about" class="headings">About</h4>
					<table class="table table-striped">
					<thead>
					<tr>
					<th scope="col">Title</th>
					<th scope="col">`+response.Title+`</th>
					</tr>
					</thead>
					<tbody>
					<tr>
					<th scope="row">Type</th>
					<td>`+response.Type+`</td> 
					<tr>
					<th scope="row">Year</th>
					<td>`+response.Year+`</td>
					</tr>
					<tr>
					<th scope="row">IMDB Id</th>
					<td>`+response.imdbID+`</td>
					</tr>
					<tr>
					<th scope="row">Rated</th>
					<td>`+response.Rated+`</td>
					</tr>
					<tr>
					<th scope="row">Released</th>
					<td>`+response.Released+`</td>
					</tr>
					<tr>
					<th scope="row">RunTime</th>
					<td>`+response.Runtime+`</td>
					</tr>
					<tr>
					<th scope="row">Genre</th>
					<td>`+response.Genre+`</td>
					</tr>
					<tr>
					<th scope="row">Language</th>
					<td>`+response.Language+`</td>
					</tr>
					<tr>
					<th scope="row">Country</th>
					<td>`+response.Country+`</td>
					</tr>
					</tbody>
					</table>
					<!-- AboutEnd---------------------- -->
					<!-- Cast-------------------- -->
					<h4 id="cast" class="headings">Cast</h4>
					<table class="table table-striped">
					<thead>
					<tr>
					<th scope="col">Director</th>
					<th scope="col">`+response.Director+`</th>
					</tr>
					</thead>
					<tbody>
					<tr>
					<th scope="row">Writer</th>
					<td>`+response.Writer+`</td>
					</tr>
					</tbody>
					</table>
					<!-- Cast end----------------------- -->
					<!-- Awards-------------------->
					<h4 id="awards" class="headings">Awards</h4>
					<br>
					<ul class="list-group awards"></ul><br>
					<h4 id="ratings" class="headings">Ratings</h4>
					<br>
					<ul class="list-group ratings" ></ul><br>`)
				let awardsArr=response.Awards.split('.')
				for(i=0;i<(awardsArr.length);i++) {
					if(awardsArr[i]){
						$('.awards').append(
							`<li class="list-group-item" >`+awardsArr[i]+`</li>`)
					}
				}
				if(!response.Ratings.length) {
					$('.ratings').append(
						`<h4 style="color:red">No Ratings Found !!!</h4>`
						)
				}
				for(i=0;i<response.Ratings.length;i++){
					$('.ratings').append(
						`<li class="list-group-item d-flex justify-content-between align-items-center">`
						+response.Ratings[i].Source+
						`<span class="badge badge-primary badge-pill">`+response.Ratings[i].Value+`
						</span>
						</li>`
						)
				}

			// 		<!-- Ratings end---------------- -->
			// 		<!-- OtherInfo -->
			$('.scrollClass').append(`<h4 id="otherInfo" class="headings">Other Info</h4>
				<table class="table table-striped">
				<thead>
				<tr>
				<th scope="col">IMDB Votes</th>
				<th scope="col">`+response.imdbVotes+`</th>
				</tr>
				</thead>
				<tbody>
				<tr>
				<th scope="row">DVD Date</th>
				<td>`+response.DVD+`</td>
				</tr>
				<tr>
				<th scope="row">BoxOffice</th>
				<td>`+response.BoxOffice+`</td>
				</tr>
				<tr>
				<th scope="row">Production</th>
				<td>`+response.Production+`</td>
				</tr>
				<tr>
				<th scope="row">Website</th>
				<td>`+response.Website+`</td>
				</tr>
				</tbody>
				</table>
				</div>
				</div>`)

		} else {
			$('.movieResponse').css("visibility","hidden")
			$('.movieNotfound').html(`<div class="mx-auto movieNotfound"><h4 style="color:red">`+response.Error+`</h4></div>`)
			$('.movieNotfound').css("visibility","visible")

		}
	},
	error:(err)=>{
		try {

			$('.movieResponse').css("visibility","hidden")
			$('.movieNotfound').html(`<div class="mx-auto movieNotfound"><h4 style="color:red">`+err.responseJSON.Error+`</h4></div>`)
			$('.movieNotfound').css("visibility","visible")

		}
		catch(err) {
			alert(err.message)
		}
	}
})
}



