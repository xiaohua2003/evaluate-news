function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    postData('http://localhost:8081/api', {name: formText})
    
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message
    }) 
}
    const postData = async (url="", data{}) => {
        console.log(data);
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin', 
            mode:'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)    
          })
          try {
            const ProjectData = await response.json();
            console.log(ProjectData);
            return ProjectData;
          }catch(error) {
          console.log("error", error);
          }
    };



export { handleSubmit }
