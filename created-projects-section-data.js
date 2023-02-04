const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const pageNumber = document.getElementById('page-number');

const projectLists = [
    document.getElementById('list-1'),
    // document.getElementById('list-2'),
    // document.getElementById('list-3')
];


///////////////////////////////////////////////////////////////////////////////////

function executeAll() {
    currentList();
    showProjectInfo();

    document.addEventListener('click', (event) => {
        console.log(event);
    })
}

///////////////////////////////////////////////////////////////////////////////////

function currentList() {
    let index = 0;
    let projectListsLength = projectLists.length;
    let lastIndex = projectListsLength - 1;

    if (projectLists.length === 1) {
        nextButton.classList.add('disabled');
    }

    previousButton.addEventListener('click', () => {
        if (index > 0) {
            index--;
        }

        changeList(index, 'previous');  //

        if (index === 0) {
            previousButton.classList.add('disabled');
        } 
        
        nextButton.classList.remove('disabled');
        pageNumber.innerHTML = index + 1;
    });

    nextButton.addEventListener('click', () => {
        console.log(index);
        if (index < projectListsLength && index !== lastIndex) {
            index++;
        }
        
        changeList(index, 'next');  //

        if (index === lastIndex) {
            nextButton.classList.add('disabled');
        } 

        previousButton.classList.remove('disabled');
        pageNumber.innerHTML = index + 1;
    });

    return index;
}


//////////////////////////////////////////////////////////////////////////////////

function changeList(index, orientation) {
    projectLists[index].classList.add('current-list');

    switch (orientation) {
        case 'previous': 
            projectLists[index + 1].classList.remove('current-list');
            break;

        case 'next':
            projectLists[index - 1].classList.remove('current-list');
            break;
    }
}


/////////////////////////////////////////////////////////////////////////////////////

function showProjectInfo() {
    const projectListItem = document.querySelectorAll('#project-list div li');
    const projectListItemAnchor = document.querySelectorAll('#project-list div li a');
    const description = document.querySelectorAll('.project-description p');
    let previousDescriptionShown = undefined;

    projectListItem.forEach((project, index) => {
        project.addEventListener('click', () => {
            if (previousDescriptionShown !== undefined) {
                description[previousDescriptionShown].classList.remove('show');
                projectListItem[previousDescriptionShown].classList.remove('selected');
            } else {
                description[0].classList.remove('show');
                projectListItem[0].classList.remove('selected');
            }
            previousDescriptionShown = index;

            project.classList.add('selected');
            description[index].classList.add('show');
            
        });

    });

    projectListItemAnchor.forEach((projectAnchor, index) => {
            projectAnchor.addEventListener('click', (event) => {
                window.innerWidth >= 1430 ? event.preventDefault() : null;
            });
    });
}

////////////////////////////////////////////////////////////////////////////////////

executeAll();
