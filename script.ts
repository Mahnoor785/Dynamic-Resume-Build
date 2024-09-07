
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeName = document.getElementById('resumeName') as HTMLHeadingElement;
const resumeEmail = document.getElementById('resumeEmail') as HTMLParagraphElement;
const resumeEducation = document.getElementById('resumeEducation') as HTMLParagraphElement;
const resumeWorkExperience = document.getElementById('resumeWorkExperience') as HTMLParagraphElement;
const resumeSkills = document.getElementById('resumeSkills') as HTMLParagraphElement;
const profilePic = document.getElementById('profilePic') as HTMLImageElement;
const resumeProfilePic = document.getElementById('resumeProfilePic') as HTMLImageElement;
const resumeContainer = document.getElementById('resumeContainer') as HTMLDivElement;

resumeForm.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const educationInput = document.getElementById('education') as HTMLTextAreaElement;
    const workExperienceInput = document.getElementById('workExperience') as HTMLTextAreaElement;
    const skillsInput = document.getElementById('skills') as HTMLInputElement;

    const name = nameInput.value;
    const email = emailInput.value;
    const education = educationInput.value;
    const workExperience = workExperienceInput.value;
    const skills = skillsInput.value;


    const imageUpload = (document.getElementById('imageUpload') as HTMLInputElement).files?.[0];
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target?.result) {
                profilePic.src = e.target.result as string; 
                resumeProfilePic.src = e.target.result as string; 
                profilePic.style.display = 'block'; 
                resumeProfilePic.style.display = 'block'; 
            }
        };
        reader.readAsDataURL(imageUpload);
    }
    if (resumeName) resumeName.innerText = name;
    if (resumeEmail) resumeEmail.innerText = email;
    if (resumeEducation) resumeEducation.innerText = education;
    if (resumeWorkExperience) resumeWorkExperience.innerText = workExperience;
    if (resumeSkills) resumeSkills.innerText = skills;

    if (resumeContainer) resumeContainer.style.display = 'block';

    resumeForm.reset();
});


document.getElementById('resumeDownload')?.addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    doc.setFontSize(22);
    if (resumeName) doc.text(resumeName.innerText, 20, 30);
    doc.setFontSize(16);
    if (resumeEmail) doc.text(resumeEmail.innerText, 20, 40);
    if (resumeEducation) doc.text("Education: " + resumeEducation.innerText, 20, 50);
    if (resumeWorkExperience) doc.text("Work Experience: " + resumeWorkExperience.innerText, 20, 60);
    if (resumeSkills) doc.text("Skills: " + resumeSkills.innerText, 20, 70);

    if (resumeProfilePic.src) {
        doc.addImage(resumeProfilePic.src, 'JPEG', 20, 80, 50, 50); 
    }


    doc.save('resume.pdf');
});
