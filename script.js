// Set the launch date to March 20, 2026
const launchDate = new Date("March 14, 2026 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").innerText = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").innerText = seconds
    .toString()
    .padStart(2, "0");

  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countdown-container").innerHTML =
      "<p class='text-2xl font-playfair'>WE ARE NOW OPEN!</p>";
  }
}

const x = setInterval(updateCountdown, 1000);
updateCountdown();

// --- Google Sheets Integration ---

// REPLACE THIS with your Google Apps Script Web App URL
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzVA4sMheNZFdDmz8YDdx6Sb_isF1CU4MVyrqPokpwJZADsxS53QUV6s-xQi_QqeTHE/exec";

const form = document.getElementById("newsletter-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button");
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const formData = new FormData(form);

    // We use fetch with 'no-cors' mode because Google Scripts doesn't support CORS headers for simple POSTs easily
    // without redirects, but 'no-cors' works for opaque requests (we won't see the response text but it sends).
    // However, to get a proper response, we usually return JSONP or handle it carefully.
    // For simplicity in this static site context:
    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Show custom modal instead of alert
        const modal = document.getElementById('success-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
        form.reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        alert("Something went wrong. Please try again later.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      });
  });
}

// Modal closing logic
const closeModalBtn = document.getElementById('close-modal');
const modal = document.getElementById('success-modal');

if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    
    // Also close on clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}
