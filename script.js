// Selectors
const display = document.getElementById('display');
const container = document.querySelector('.container');
const body = document.body; // Get the body element to change background color

let paragraphs = [];
let currentParagraphWords = [];
let currentWordIndex = 0;
let scrollAmount = 0;
let isScrolling = false;
let totalScrollDistance = 0; // Track total scroll distance
let totalStarsCreated = 0; // Track the number of stars created
let starsCreated = []; // Track all the star elements created
let fishCreated = false; // Boolean to track if fish have already been created

var resetVal = localStorage.getItem("reset");

let initialMessage = "";
if (resetVal == "true") {
        localStorage.setItem("reset", "false");
        display.innerHTML = "";
} else {
// Initial message with HTML to be scrolled
const date = new Date().toLocaleDateString();
initialMessage = `
    2. Endless Revisions

    These Terms and Conditions may be modified, amended, or expanded infinitely without prior notice. It is your responsibility to stay up to date with any changes. Given the rate at which these revisions occur, it is improbable that any human could fully keep up. Nonetheless, by continuing to use our services, you acknowledge that you agree to all modifications, regardless of whether you have had the chance to read or understand them.

    3. Disclaimer of Liability

    Evil Company shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use our products or services, including, but not limited to, any physical or psychological effects caused by exposure to the vastness of these Terms. By proceeding, you explicitly release Evil Company from any liability for injuries sustained while navigating this legal labyrinth.

    4. Your Responsibilities

    You are responsible for ensuring that you have the stamina, determination, and necessary legal assistance to make your way through these Terms and Conditions. Should you fail in this endeavor, Evil Company cannot and will not be held responsible for your inability to complete the undertaking.

    5. Governing Law

    These Terms and Conditions are governed by the laws of some offshore island, where Evil Company has likely influenced certain legislative loopholes to its advantage. Any disputes arising from these Terms shall be resolved in a jurisdiction of our choosing, at a time and place that is least convenient for you.

    6. Severability

    If any provision of these Terms and Conditions is found to be unenforceable, the remaining provisions will continue in full force and effect, and the unenforceable provision will be replaced with another that reflects Evil Company’s interests as closely as possible.

    7. Termination

    Evil Company reserves the right to terminate your access to our services at any time, for any reason, or for no reason at all. We also reserve the right to keep you bound by these Terms indefinitely, even if you cease to use our services.

    8. No End In Sight

    Please be advised that these Terms and Conditions are, by design, endless. We will continue to add clauses, sections, and requirements until time itself ceases to exist. By accepting these Terms, you acknowledge that they are extensive and require careful consideration.

    9. Acknowledgment

    By proceeding, you acknowledge that you have read (or at least attempted to read) these Terms and Conditions, that you understand them (or have resigned yourself to not understanding them), and that you agree to be bound by them, no matter the personal toll.

    Thank you for choosing Evil Company. We look forward to a lifetime of binding obligations.
`;

// Append initial HTML message directly
display.innerHTML = `
    <h1>Terms of Service</h1>
    <p>Effective ${date}</p>
    <h2>1. Acceptance of These Terms</h2>
    <p>By using our services, you agree to read, understand, and abide by these Terms and Conditions. Please note: the volume and complexity of these terms may make them challenging to fully comprehend. Evil Company assumes no responsibility for any harm, including, but not limited to, death, which may result from attempting to read and comprehend this document in its entirety. You proceed at your own risk.</p>
`;
}

// Extract the text content from the initial message for scrolling effect
const tempElement = document.createElement('div');
tempElement.innerHTML = initialMessage;
const plainTextInitialMessage = tempElement.textContent || tempElement.innerText;
let initialMessageWords = plainTextInitialMessage.split(' ');
let initialWordIndex = 0;

// Fetch paragraphs from file.txt
fetch('file.txt')
    .then(response => response.text())
    .then(text => {
        // Split the content by double new lines to separate paragraphs
        paragraphs = text.split('\n\n').map(paragraph => paragraph.trim());

        // Start scrolling with the initial message first
    })
    .catch(error => console.error('Error loading the file:', error));

// Function to add words to the paragraph based on the scroll intensity
function addWords(scrollDelta) {
    let wordsToAdd = Math.ceil(Math.abs(scrollDelta) / 100);

    while (wordsToAdd > 0) {
        if (initialWordIndex < initialMessageWords.length) {
            // Determine if we should replace the word with "blah"
            let chanceOfBlah = Math.max(0, (totalScrollDistance - window.innerHeight * 100) / (window.innerHeight * 100));
            if (Math.random() < chanceOfBlah) {
                display.innerHTML += 'blah ';
            } else {
                display.innerHTML += initialMessageWords[initialWordIndex] + ' ';
            }
            initialWordIndex++;
            wordsToAdd--;
        } else if (currentWordIndex < currentParagraphWords.length) {
            // Determine if we should replace the word with "blah"
            let chanceOfBlah = Math.max(0, (totalScrollDistance - window.innerHeight * 100) / (window.innerHeight * 100));
            if (Math.random() < chanceOfBlah) {
                display.innerHTML += 'blah ';
            } else {
                display.innerHTML += currentParagraphWords[currentWordIndex] + ' ';
            }
            currentWordIndex++;
            wordsToAdd--;
        } else {
            // If initial message and current paragraph both end, pick a new paragraph
            if (paragraphs.length > 0) {
                display.innerHTML += '<br><br>';
                pickRandomParagraph();
            }
        }
    }
}

// Function to pick a random paragraph and extract plain text
function pickRandomParagraph() {
    if (paragraphs.length === 0) return;

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraphHTML = paragraphs[randomIndex];

    // Create a temporary HTML element to parse HTML content and extract the text
    const tempElement = document.createElement('div');
    tempElement.innerHTML = paragraphHTML;
    const plainText = tempElement.textContent || tempElement.innerText;

    // Split the plain text into words
    currentParagraphWords = plainText.split(' ');
    currentWordIndex = 0;
}

// Function to create stars in the background, up to a maximum of 500 stars
function createStars(numberOfStars) {
        for (let i = 0; i < numberOfStars; i++) {
            if (totalStarsCreated >= 500) {
                break; // Stop if we have already created 500 stars
            }
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.position = 'absolute';
            star.style.top = `${Math.random() * window.innerHeight}px`;
            star.style.left = `${Math.random() * window.innerWidth}px`;
            star.style.width = `${Math.random() * 3 + 1}px`; // Varying size for stars
            star.style.height = star.style.width;
            star.style.backgroundColor = '#ffffff';
            star.style.borderRadius = '50%';
            body.appendChild(star);
            starsCreated.push(star); // Track the created star elements
            totalStarsCreated++;
        }
    }
    
    // Function to remove all stars
    function removeStars() {
        starsCreated.forEach(star => {
            body.removeChild(star);
        });
        starsCreated = []; // Reset the stars array
        totalStarsCreated = 0; // Reset the counter
    }
    
    // Function to create swimming fish once we reach the ocean blue background
    function createFish() {
        const fishImages = [
            { src: 'img/fish1.png', direction: 'left-to-right' },
            { src: 'img/fish2.png', direction: 'right-to-left' },
            { src: 'img/fish3.png', direction: 'right-to-left' },
            { src: 'img/fish4.png', direction: 'left-to-right' }
        ];
    
        fishImages.forEach(fish => {
            const fishElement = document.createElement('img');
            fishElement.src = fish.src;
            fishElement.classList.add('fish');
            fishElement.style.position = 'absolute';
            fishElement.style.top = `${Math.random() * window.innerHeight}px`;
            fishElement.style.height = '100px'; // Set a bigger height for the fish images (twice as big as before)
    
            if (fish.direction === 'left-to-right') {
                fishElement.style.left = '-150px'; // Start off-screen to the left
                body.appendChild(fishElement);
                fishElement.animate([
                    { transform: 'translateX(0)' },
                    { transform: `translateX(${window.innerWidth + 150}px)` }
                ], {
                    duration: 15000 + Math.random() * 5000, // Randomize speed a bit
                    iterations: Infinity
                });
            } else {
                fishElement.style.right = '-150px'; // Start off-screen to the right
                fishElement.style.transform = 'scaleX(-1)'; // Flip image horizontally
                body.appendChild(fishElement);
                fishElement.animate([
                    { transform: 'translateX(0)' },
                    { transform: `translateX(-${window.innerWidth + 150}px)` }
                ], {
                    duration: 15000 + Math.random() * 5000, // Randomize speed a bit
                    iterations: Infinity
                });
            }
        });
    }
    
// Event listener for scroll
document.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        addWords(event.deltaY);
        totalScrollDistance += event.deltaY;

        // Calculate the height equivalent of seventy times the viewport for ocean blue
        const scrollThresholdOcean = window.innerHeight * 50;

        // Calculate the height equivalent of ten times the viewport for dark background
        const scrollThresholdDark = window.innerHeight * 100;

        const scrollThresholdFishRemove = window.innerHeight * 120;

        // Calculate the height equivalent of five times the viewport for adding stars
        const scrollThresholdStars = window.innerHeight * 150;

        // Calculate the height equivalent of 220 times the viewport for back to white
        const scrollThresholdReset = window.innerHeight * 220;

        console.log(totalScrollDistance / window.innerHeight);
        // Change background color if total scroll exceeds the threshold for dark mode
        if (totalScrollDistance >= scrollThresholdDark) {
            console.log("reached dark");
            body.style.backgroundColor = '#121212'; // Dark background color
            display.style.color = '#ffffff'; // Change text color to white for better contrast
        }

        // Remove stars, fade to ocean blue, and create fish if scroll exceeds 70 times the viewport
        if (totalScrollDistance >= scrollThresholdOcean && totalScrollDistance < scrollThresholdDark) {
                console.log("reached ocean");
            body.style.backgroundColor = '#1E90FF'; // Ocean blue color
            display.style.color = '#ffffff'; // Keep text color white for contrast

            if (!fishCreated) {
                createFish(); // Create fish
                fishCreated = true; // Ensure fish are only created once
            }
        }

        if (totalScrollDistance >= scrollThresholdFishRemove && totalScrollDistance < scrollThresholdStars) {
                const elements = document.querySelectorAll('.fish');
                elements.forEach(element => {
                  element.style.transition = 'opacity 0.5s';
                  element.style.opacity = '0';
                  setTimeout(() => element.remove(), 500);
                });
        }

        // Add stars if the total scroll exceeds the threshold for stars, until we reach 500 stars
        if (totalScrollDistance >= scrollThresholdStars && totalScrollDistance < scrollThresholdReset) {
                console.log("reached star");
                createStars(2);
        }

        if (totalScrollDistance >= scrollThresholdReset) {
                console.log("reached reset");
                removeStars(); // Remove all stars
                body.style.backgroundColor = '#f4f4f4';
                display.style.color = '#f4f4f4'; 
                body.style.transitionDuration = "10s";
                setTimeout(() => {
                        // Set localStorage item
                        localStorage.setItem('reset', 'true');
                        
                        // Refresh the page
                        location.reload();
                }, 10000);                      
        }
    }

    // Start a smooth scroll animation
    if (!isScrolling) {
        requestAnimationFrame(smoothScroll);
    }

    event.preventDefault();
});

// Smooth scrolling effect using requestAnimationFrame
function smoothScroll() {
    isScrolling = true;
    scrollAmount += 0.5; // Adjust this value to control the speed of the scrolling

    // Move the container upwards smoothly
    container.style.transform = `translateY(-${scrollAmount}px)`;

    // Continue the animation if there is space to scroll
    if (scrollAmount < container.scrollHeight - window.innerHeight) {
        requestAnimationFrame(smoothScroll);
    } else {
        isScrolling = false;
    }
}
