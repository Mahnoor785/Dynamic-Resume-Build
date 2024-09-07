const resumeForm = document.getElementById('resumeForm');
const resumeName = document.getElementById('resumeName');
const resumeEmail = document.getElementById('resumeEmail');
const resumeEducation = document.getElementById('resumeEducation');
const resumeWorkExperience = document.getElementById('resumeWorkExperience');
const resumeSkills = document.getElementById('resumeSkills');
const profilePic = document.getElementById('profilePic');
const resumeProfilePic = document.getElementById('resumeProfilePic');
const resumeContainer = document.getElementById('resumeContainer');

resumeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Capture user input
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const education = document.getElementById('education').value;
    const workExperience = document.getElementById('workExperience').value;
    const skills = document.getElementById('skills').value;

    // Handle image upload
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePic.src = e.target.result; // Set the src of the profile pic
            resumeProfilePic.src = e.target.result; // Set the src of the profile pic in resume
            profilePic.style.display = 'block'; // Show the image
            resumeProfilePic.style.display = 'block'; // Show the image in resume
        };
        reader.readAsDataURL(imageUpload);
    }

    // Update the resume
    resumeName.innerText = name;
    resumeEmail.innerText = email;
    resumeEducation.innerText = education;
    resumeWorkExperience.innerText = workExperience;
    resumeSkills.innerText = skills;

    // Show the resume container
    resumeContainer.style.display = 'block';

    // Optionally, clear the form after submission
    resumeForm.reset();
});

// Download Resume as PDF
document.getElementById('resumeDownload').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adding content to the PDF
    doc.setFontSize(22);
    doc.text(resumeName.innerText, 20, 30);
    doc.setFontSize(16);
    doc.text(resumeEmail.innerText, 20, 40);
    doc.text("Education: " + resumeEducation.innerText, 20, 50);
    doc.text("Work Experience: " + resumeWorkExperience.innerText, 20, 60);
    doc.text("Skills: " + resumeSkills.innerText, 20, 70);

    // Add profile image if available
    if (resumeProfilePic.src) {
        doc.addImage(resumeProfilePic.src, 'JPEG', 20, 80, 50, 50); // Add profile image
    }

    // Save the PDF
    doc.save('resume.pdf');
});

//
