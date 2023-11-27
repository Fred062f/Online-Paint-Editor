const button = document.querySelector('button');
const label = document.querySelector('label')
const input = document.querySelector('input');
const pTag = document.querySelector('p');
const img = document.querySelector('img');

button.addEventListener("click", () => {
    img.style.visibility = 'visible';
    button.style.display = 'none';
    label.innerText = `Generating ${label.innerText.split(' ').slice(1).join(' ')}`;

    getGeneratedText(`Create a short screenplay for a movie scene about: ${input.value}. It has to have dialog between two or more characters. It should include an EXT.`)
        .then(generatedText => {
            pTag.innerText = generatedText.split(`Create a short screenplay for a movie scene about: ${input.value}. It has to have dialog between two or more characters. It should include an EXT.`).slice(1).join(' ');
            label.innerText = `Generated ${label.innerText.split(' ').slice(1).join(' ')}`;
            img.style.display = 'none';
        })
        .catch(err => {
            window.location.reload()
            alert("Error generating text. Please try again.");
        });
});

