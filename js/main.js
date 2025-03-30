let state = {
  personalInfo: {
    fullName: "",
    phone: "",
    email: "",
    github: "",
    portfolio: "",
  },
  education: [],
  projects: [],
  volunteerWork: [],
  softSkills: [],
  technicalSkills: {
    languages: "",
    developerTools: "",
    frameworks: "",
    designTools: "",
  },
  currentStep: 1,
}

function handleError(fn, context = "") {
  return function (...args) {
    try {
      return fn.apply(this, args)
    } catch (error) {
      console.error(`Error in ${context}:`, error)
      alert(`An error occurred in ${context}. Please check the console for details.`)
    }
  }
}

function updateSoftSkill(index, value) {
  if (state.softSkills[index] !== undefined) {
    state.softSkills[index] = value
    updatePreview()
  }
}

function addSoftSkill() {
  state.softSkills.push("")
  updateSoftSkillsList()
  updatePreview()
}

function removeSoftSkill(index) {
  state.softSkills.splice(index, 1)
  updateSoftSkillsList()
  updatePreview()
}


function removeProjectPoint(id, index) {
  const project = state.projects.find((proj) => proj.id === id)
  if (project && project.points.length > 1) {
    project.points.splice(index, 1)
    updateProjectsList()
    updatePreview()
  } else if (project) {

    project.points[0] = ""
    updateProjectsList()
    updatePreview()
  }
}

function removeVolunteerResponsibility(id, index) {
  const volunteer = state.volunteerWork.find((work) => work.id === id)
  if (volunteer && volunteer.responsibilities.length > 1) {
    volunteer.responsibilities.splice(index, 1)
    updateVolunteerList()
    updatePreview()
  } else if (volunteer) {

    volunteer.responsibilities[0] = ""
    updateVolunteerList()
    updatePreview()
  }
}

function updateProjectsList() {
  const projectsList = document.getElementById("projectsList")
  if (!projectsList) return

  projectsList.innerHTML = state.projects
    .map(
      (proj) => `
        <div class="project-item" data-id="${proj.id}">
            <input type="text" placeholder="Project Name" value="${proj.name}" onchange="updateProject(${proj.id}, 'name', this.value)">
            <input type="text" placeholder="Website" value="${proj.website}" onchange="updateProject(${proj.id}, 'website', this.value)">
            <input type="text" placeholder="Source Code" value="${proj.sourceCode}" onchange="updateProject(${proj.id}, 'sourceCode', this.value)">
            <input type="text" placeholder="Technologies Used" value="${proj.technologies}" onchange="updateProject(${proj.id}, 'technologies', this.value)">
            <div class="project-points">
                ${proj.points
                  .map(
                    (point, index) => `
                    <div class="point-input-group">
                        <input type="text" placeholder="Project Point ${index + 1}" value="${point}" onchange="updateProjectPoint(${proj.id}, ${index}, this.value)">
                        <button class="btn secondary btn-small" onclick="removeProjectPoint(${proj.id}, ${index})"><i class="fas fa-times"></i></button>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <button class="btn secondary" onclick="addProjectPoint(${proj.id})">Add Point</button>
            <button class="btn secondary" onclick="removeProject(${proj.id})">Remove Project</button>
        </div>
    `,
    )
    .join("")
}

function updateVolunteerList() {
  const volunteerList = document.getElementById("volunteerList")
  if (!volunteerList) return

  volunteerList.innerHTML = state.volunteerWork
    .map(
      (vol) => `
        <div class="volunteer-item" data-id="${vol.id}">
            <input type="text" placeholder="Organization" value="${vol.organization}" onchange="updateVolunteer(${vol.id}, 'organization', this.value)">
            <input type="text" placeholder="Period" value="${vol.period}" onchange="updateVolunteer(${vol.id}, 'period', this.value)">
            <input type="text" placeholder="Role" value="${vol.role}" onchange="updateVolunteer(${vol.id}, 'role', this.value)">
            <input type="text" placeholder="Location" value="${vol.location}" onchange="updateVolunteer(${vol.id}, 'location', this.value)">
            <div class="responsibilities">
                ${vol.responsibilities
                  .map(
                    (resp, index) => `
                    <div class="point-input-group">
                        <input type="text" placeholder="Responsibility ${index + 1}" value="${resp}" onchange="updateVolunteerResponsibility(${vol.id}, ${index}, this.value)">
                        <button class="btn secondary btn-small" onclick="removeVolunteerResponsibility(${vol.id}, ${index})"><i class="fas fa-times"></i></button>
                    </div>
                `,
                  )
                  .join("")}
            </div>
            <button class="btn secondary" onclick="addVolunteerResponsibility(${vol.id})">Add Responsibility</button>
            <button class="btn secondary" onclick="removeVolunteer(${vol.id})">Remove</button>
        </div>
    `,
    )
    .join("")
}

function updateSoftSkillsList() {
  const softSkillsList = document.getElementById("softSkillsList")
  if (!softSkillsList) return

  softSkillsList.innerHTML = state.softSkills
    .map(
      (skill, index) => `
        <div class="soft-skill-item">
            <input type="text" placeholder="Soft Skill Point ${index + 1}" value="${skill}" onchange="updateSoftSkill(${index}, this.value)">
            <button class="btn secondary" onclick="removeSoftSkill(${index})">Remove</button>
        </div>
    `,
    )
    .join("")
}

function goToStep(stepNumber) {

  document.querySelectorAll(".form-step").forEach((step) => {
    step.classList.remove("active")
  })


  document.getElementById(`step${stepNumber}`).classList.add("active")


  document.querySelectorAll(".step-dot").forEach((dot) => {
    dot.classList.remove("active")
  })
  document.querySelectorAll(".step-label").forEach((label) => {
    label.classList.remove("active")
  })


  for (let i = 1; i <= stepNumber; i++) {
    document.querySelector(`.step-dot[data-step="${i}"]`).classList.add("active")
  }
  document.querySelectorAll(".step-label")[stepNumber - 1].classList.add("active")


  state.currentStep = stepNumber
}

function setupEventListeners() {
  try {
    console.log("Setting up event listeners...")


    document.querySelectorAll(".next-step").forEach((button) => {
      button.addEventListener("click", () => {
        goToStep(state.currentStep + 1)
      })
    })

    document.querySelectorAll(".prev-step").forEach((button) => {
      button.addEventListener("click", () => {
        goToStep(state.currentStep - 1)
      })
    })

    document.getElementById("finalizeBtn").addEventListener("click", () => {
      alert("Your resume is complete! You can now download it as a PDF.")
    })


    document.querySelectorAll(".step-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        goToStep(Number.parseInt(dot.getAttribute("data-step")))
      })
    })


    document.getElementById("fullName")?.addEventListener("input", (e) => {
      state.personalInfo.fullName = e.target.value
      updatePreview()
    })

    document.getElementById("phone")?.addEventListener("input", (e) => {
      state.personalInfo.phone = e.target.value
      updatePreview()
    })

    document.getElementById("email")?.addEventListener("input", (e) => {
      state.personalInfo.email = e.target.value
      updatePreview()
    })

    document.getElementById("github")?.addEventListener("input", (e) => {
      state.personalInfo.github = e.target.value
      updatePreview()
    })

    document.getElementById("portfolio")?.addEventListener("input", (e) => {
      state.personalInfo.portfolio = e.target.value
      updatePreview()
    })


    document.getElementById("languages")?.addEventListener("input", (e) => {
      state.technicalSkills.languages = e.target.value
      updatePreview()
    })

    document.getElementById("developerTools")?.addEventListener("input", (e) => {
      state.technicalSkills.developerTools = e.target.value
      updatePreview()
    })

    document.getElementById("frameworks")?.addEventListener("input", (e) => {
      state.technicalSkills.frameworks = e.target.value
      updatePreview()
    })

    document.getElementById("designTools")?.addEventListener("input", (e) => {
      state.technicalSkills.designTools = e.target.value
      updatePreview()
    })


    const addEducationBtn = document.getElementById("addEducation")
    if (addEducationBtn) {
      addEducationBtn.addEventListener("click", () => {
        const education = {
          id: Date.now(),
          school: "",
          level: "",
          period: "",
          isOngoing: false,
          expectedGraduation: "",
          degree: "",
          location: "",
          gpa: "",
          courses: "",
        }
        state.education.push(education)
        updateEducationList()
        updatePreview()
      })
    }


    const addProjectBtn = document.getElementById("addProject")
    if (addProjectBtn) {
      addProjectBtn.addEventListener("click", () => {
        const project = {
          id: Date.now(),
          name: "",
          website: "",
          sourceCode: "",
          technologies: "",
          points: [""],
        }
        state.projects.push(project)
        updateProjectsList()
        updatePreview()
      })
    }


    const addVolunteerBtn = document.getElementById("addVolunteer")
    if (addVolunteerBtn) {
      addVolunteerBtn.addEventListener("click", () => {
        const volunteer = {
          id: Date.now(),
          organization: "",
          period: "",
          role: "",
          location: "",
          responsibilities: [""],
        }
        state.volunteerWork.push(volunteer)
        updateVolunteerList()
        updatePreview()
      })
    }


    const addSoftSkillBtn = document.getElementById("addSoftSkill")
    if (addSoftSkillBtn) {
      addSoftSkillBtn.addEventListener("click", addSoftSkill)
    }


    const saveBtn = document.getElementById("saveBtn")
    const downloadBtn = document.getElementById("downloadBtn")

    if (saveBtn) {
      saveBtn.addEventListener("click", saveResume)
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", downloadPDF)
    }


    const newResumeBtn = document.getElementById("newResumeBtn")
    if (newResumeBtn) {
      newResumeBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to start a new resume? This will clear all current data.")) {

          state = {
            personalInfo: {
              fullName: "",
              phone: "",
              email: "",
              github: "",
              portfolio: "",
            },
            education: [],
            projects: [],
            volunteerWork: [],
            softSkills: [],
            technicalSkills: {
              languages: "",
              developerTools: "",
              frameworks: "",
              designTools: "",
            },
            currentStep: 1,
          }

          updateUI()

          goToStep(1)

          localStorage.removeItem("resumeData")
          alert("Started a new resume!")
        }
      })
    }

    console.log("Event listeners setup completed")
  } catch (error) {
    console.error("Error setting up event listeners:", error)
    alert("Error setting up the application. Please refresh the page.")
  }
}

function updateUI() {
  try {

    Object.keys(state.personalInfo).forEach((key) => {
      const element = document.getElementById(key)
      if (element) {
        element.value = state.personalInfo[key]
      }
    })


    updateSoftSkillsList()


    Object.keys(state.technicalSkills).forEach((key) => {
      const element = document.getElementById(key)
      if (element) {
        element.value = state.technicalSkills[key]
      }
    })


    updateEducationList()
    updateProjectsList()
    updateVolunteerList()
    updatePreview()
  } catch (error) {
    console.error("Error updating UI:", error)
  }
}

function updateEducation(id, field, value) {
  const education = state.education.find((edu) => edu.id === id)
  if (education) {
    education[field] = value


    if (field === "isOngoing") {
      updateEducationList()
    }

    updatePreview()
  }
}

function updateProject(id, field, value) {
  const project = state.projects.find((proj) => proj.id === id)
  if (project) {
    project[field] = value
    updatePreview()
  }
}

function updateProjectPoint(id, index, value) {
  const project = state.projects.find((proj) => proj.id === id)
  if (project && project.points[index] !== undefined) {
    project.points[index] = value
    updatePreview()
  }
}

function addProjectPoint(id) {
  const project = state.projects.find((proj) => proj.id === id)
  if (project) {
    project.points.push("")
    updateProjectsList()
    updatePreview()
  }
}

function updateVolunteer(id, field, value) {
  const volunteer = state.volunteerWork.find((work) => work.id === id)
  if (volunteer) {
    volunteer[field] = value
    updatePreview()
  }
}

function updateVolunteerResponsibility(id, index, value) {
  const volunteer = state.volunteerWork.find((work) => work.id === id)
  if (volunteer && volunteer.responsibilities[index] !== undefined) {
    volunteer.responsibilities[index] = value
    updatePreview()
  }
}

function addVolunteerResponsibility(id) {
  const volunteer = state.volunteerWork.find((work) => work.id === id)
  if (volunteer) {
    volunteer.responsibilities.push("")
    updateVolunteerList()
    updatePreview()
  }
}

function removeProject(id) {
  state.projects = state.projects.filter((proj) => proj.id !== id)
  updateProjectsList()
  updatePreview()
}

function removeVolunteer(id) {
  state.volunteerWork = state.volunteerWork.filter((work) => work.id !== id)
  updateVolunteerList()
  updatePreview()
}

function removeEducation(id) {
  state.education = state.education.filter((edu) => edu.id !== id)
  updateEducationList()
  updatePreview()
}

function updateEducationList() {
  const educationList = document.getElementById("educationList")
  if (!educationList) return

  educationList.innerHTML = state.education
    .map(
      (edu) => `
        <div class="education-item" data-id="${edu.id}">
            <input type="text" placeholder="School" value="${edu.school}" onchange="updateEducation(${edu.id}, 'school', this.value)">
            <input type="text" placeholder="Level (e.g., Bachelor's, Master's)" value="${edu.level || ""}" onchange="updateEducation(${edu.id}, 'level', this.value)">
            <div class="ongoing-checkbox">
                <label>
                    <input type="checkbox" ${edu.isOngoing ? "checked" : ""} onchange="updateEducation(${edu.id}, 'isOngoing', this.checked)"> 
                    Currently Studying
                </label>
            </div>
            ${
              edu.isOngoing
                ? `<input type="text" placeholder="Expected Graduation (e.g., May 2025)" value="${edu.expectedGraduation || ""}" onchange="updateEducation(${edu.id}, 'expectedGraduation', this.value)">`
                : `<input type="text" placeholder="Period (e.g., 2018-2022)" value="${edu.period}" onchange="updateEducation(${edu.id}, 'period', this.value)">`
            }
            <input type="text" placeholder="Degree" value="${edu.degree}" onchange="updateEducation(${edu.id}, 'degree', this.value)">
            <input type="text" placeholder="Location" value="${edu.location}" onchange="updateEducation(${edu.id}, 'location', this.value)">
            <div class="gpa-input">
                <input type="text" placeholder="GPA" value="${edu.gpa}" onchange="updateEducation(${edu.id}, 'gpa', this.value)">
                <input type="text" placeholder="Relevant Courses" value="${edu.courses}" onchange="updateEducation(${edu.id}, 'courses', this.value)">
            </div>
            <button class="btn secondary" onclick="removeEducation(${edu.id})">Remove</button>
        </div>
    `,
    )
    .join("")
}

function generatePDF() {
  try {

    const element = document.getElementById("resumePreview")
    if (!element) {
      console.error("Resume preview element not found")
      return
    }


    const container = document.createElement("div")
    container.style.position = "absolute"
    container.style.left = "-9999px"
    container.style.top = "-9999px"
    container.style.width = "210mm"


    const clone = element.cloneNode(true)


    const computedStyle = window.getComputedStyle(element)


    clone.style.fontFamily = computedStyle.fontFamily
    clone.style.fontSize = computedStyle.fontSize
    clone.style.lineHeight = computedStyle.lineHeight
    clone.style.letterSpacing = computedStyle.letterSpacing
    clone.style.fontWeight = computedStyle.fontWeight
    clone.style.color = computedStyle.color
    clone.style.backgroundColor = "white"


    clone.style.width = "210mm"
    clone.style.height = "auto" 
    clone.style.maxHeight = "297mm" 
    clone.style.padding = "1.4cm" 
    clone.style.boxSizing = "border-box"
    clone.style.boxShadow = "none"
    clone.style.overflow = "hidden" 


    container.appendChild(clone)


    document.body.appendChild(container)


    setTimeout(() => {
      const opt = {
        margin: [0, 0, 0, 0], 
        filename: `${state.personalInfo.fullName.replace(/\s+/g, "_")}_resume.pdf`,
        image: { type: "jpeg", quality: 1.0 }, 
        html2canvas: {
          scale: 2, 
          useCORS: true,
          logging: false,
          letterRendering: true,
          allowTaint: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          precision: 16, 
          compress: true,
          putOnlyUsedFonts: true,
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        enableLinks: true,
      }


      window
        .html2pdf()
        .set(opt)
        .from(clone)
        .toPdf()
        .get("pdf")
        .then((pdf) => {

          if (pdf.internal.getNumberOfPages() > 1) {

            for (let i = pdf.internal.getNumberOfPages(); i > 1; i--) {
              pdf.deletePage(i)
            }
          }
          return pdf
        })
        .save()
        .then(() => {
          console.log("PDF generated successfully")

          document.body.removeChild(container)
        })
        .catch((err) => {
          console.error("Error generating PDF:", err)

          document.body.removeChild(container)
          alert("There was an error generating the PDF. Please try again.")
        })
    }, 200)
  } catch (error) {
    console.error("Error in generatePDF:", error)
    alert("An error occurred while generating the PDF. Please try again.")
  }
}

function downloadPDF() {
  try {
    if (!state.personalInfo.fullName) {
      alert("Please enter your name before downloading the PDF.")
      return
    }

    console.log("Starting PDF download...")


    if (typeof window.html2pdf === "undefined") {
      console.error("html2pdf is not defined. Attempting to load the library...")


      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
      script.integrity =
        "sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
      script.crossOrigin = "anonymous"
      script.referrerPolicy = "no-referrer"

      script.onload = () => {
        console.log("html2pdf library loaded successfully")

        generatePDF()
      }

      script.onerror = () => {
        console.error("Failed to load html2pdf library")
        alert("Failed to load the PDF generation library. Please check your internet connection and try again.")
      }

      document.head.appendChild(script)
      return
    }


    generatePDF()
  } catch (error) {
    console.error("Error in downloadPDF:", error)
    alert("An error occurred while generating the PDF. Please try again.")
  }
}


function updatePreview() {
  try {
    console.log("Updating preview...")
    const preview = document.getElementById("resumePreview")
    if (!preview) {
      console.error("Preview element not found!")
      return
    }


    console.log("Current state:", JSON.stringify(state))


    const sanitizedState = {
      ...state,
      personalInfo: { ...state.personalInfo },
      education: [...state.education],
      projects: [...state.projects],
      volunteerWork: [...state.volunteerWork],
      softSkills: [...state.softSkills],
      technicalSkills: { ...state.technicalSkills },
    }

    preview.innerHTML = `
            <div class="resume-header">
                <h1>${sanitizedState.personalInfo.fullName || ""}</h1>
                <div class="contact-info">
                    ${sanitizedState.personalInfo.phone ? `<span><i class="fas fa-phone"></i> ${sanitizedState.personalInfo.phone}</span>` : ""}
                    ${sanitizedState.personalInfo.email ? `<span><i class="fas fa-envelope"></i> <a href="mailto:${sanitizedState.personalInfo.email}">${sanitizedState.personalInfo.email}</a></span>` : ""}
                    ${sanitizedState.personalInfo.github ? `<span><i class="fab fa-github"></i> <a href="${sanitizedState.personalInfo.github}">${sanitizedState.personalInfo.github.replace("https://github.com/", "")}</a></span>` : ""}
                    ${sanitizedState.personalInfo.portfolio ? `<span><i class="fas fa-briefcase"></i> <a href="${sanitizedState.personalInfo.portfolio}">${sanitizedState.personalInfo.portfolio.replace("https://", "")}</a></span>` : ""}
                </div>
            </div>

            ${
              sanitizedState.education.length > 0
                ? `
                <section>
                    <div class="section-title">Education</div>
                    ${sanitizedState.education
                      .map(
                        (edu) => `
                        <div class="education-item">
                            <div class="item-header">
                                <span>${edu.school}</span>
                                <span>${edu.isOngoing ? `Expected Graduation: ${edu.expectedGraduation}` : edu.period}</span>
                            </div>
                            <div class="education-level-row">
                                <span class="education-level">${edu.level || ""}</span>
                                <span>${edu.location}</span>
                            </div>
                            <div class="degree-line">
                                <span>${edu.degree}${edu.gpa ? ` - ${edu.gpa}` : ""}</span>
                            </div>
                            ${edu.courses ? `<div class="courses-line">Courses: ${edu.courses}</div>` : ""}
                        </div>
                    `,
                      )
                      .join("")}
                </section>
            `
                : ""
            }

            ${
              sanitizedState.projects.length > 0
                ? `
                <section>
                    <div class="section-title">Projects</div>
                    ${sanitizedState.projects
                      .map(
                        (proj) => `
                            <div class="project-item">
                                <div class="item-header">
                                    <span><span class="project-name">${proj.name}</span> ${proj.website ? `| <a href="${proj.website}">Website</a>` : ""} ${proj.sourceCode ? `| <a href="${proj.sourceCode}">Source Code</a>` : ""}</span>
                                    <span>${proj.technologies}</span>
                                </div>
                                <ul>
                                    ${proj.points
                                      .filter((point) => point.trim())
                                      .map((point) => `<li>${point}</li>`)
                                      .join("")}
                                </ul>
                            </div>
                        `,
                      )
                      .join("")}
                </section>
            `
                : ""
            }

            ${
              sanitizedState.volunteerWork.length > 0
                ? `
                <section>
                    <div class="section-title">Volunteer Work</div>
                    ${sanitizedState.volunteerWork
                      .map(
                        (work) => `
                        <div class="volunteer-item">
                            <div class="item-header">
                                <span>${work.organization}</span>
                                <span>${work.period}</span>
                            </div>
                            <div class="item-subheader">
                                <span>${work.role}</span>
                                <span>${work.location}</span>
                            </div>
                            <ul>
                                ${work.responsibilities
                                  .filter((resp) => resp.trim())
                                  .map((resp) => `<li>${resp}</li>`)
                                  .join("")}
                            </ul>
                        </div>
                    `,
                      )
                      .join("")}
                </section>
            `
                : ""
            }

            ${
              sanitizedState.softSkills.length > 0
                ? `
                <section>
                    <div class="section-title">Soft Skills</div>
                    <ul class="soft-skills-list">
                        ${sanitizedState.softSkills
                          .filter((skill) => skill.trim())
                          .map((skill) => `<li>${skill}</li>`)
                          .join("")}
                    </ul>
                </section>
            `
                : ""
            }

            ${
              Object.values(sanitizedState.technicalSkills).some((value) => value)
                ? `
                <section>
                    <div class="section-title">Technical Skills</div>
                    <div class="technical-skills">
                        ${
                          sanitizedState.technicalSkills.languages
                            ? `
                            <div class="skill-category">
                                <span class="skill-category-name">Languages:</span>
                                <span class="skill-category-value">${sanitizedState.technicalSkills.languages}</span>
                            </div>
                        `
                            : ""
                        }
                        ${
                          sanitizedState.technicalSkills.developerTools
                            ? `
                            <div class="skill-category">
                                <span class="skill-category-name">Developer Tools:</span>
                                <span class="skill-category-value">${sanitizedState.technicalSkills.developerTools}</span>
                            </div>
                        `
                            : ""
                        }
                        ${
                          sanitizedState.technicalSkills.frameworks
                            ? `
                            <div class="skill-category">
                                <span class="skill-category-name">Libraries/Frameworks:</span>
                                <span class="skill-category-value">${sanitizedState.technicalSkills.frameworks}</span>
                            </div>
                        `
                            : ""
                        }
                        ${
                          sanitizedState.technicalSkills.designTools
                            ? `
                            <div class="skill-category">
                                <span class="skill-category-name">Designing Tools:</span>
                                <span class="skill-category-value">${sanitizedState.technicalSkills.designTools}</span>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </section>
            `
                : ""
            }
        `
  } catch (error) {
    console.error("Error updating preview:", error)
  }
}

function saveResume() {
  try {
    localStorage.setItem("resumeData", JSON.stringify(state))
    alert("Resume saved successfully!")
  } catch (error) {
    console.error("Error saving resume:", error)
    alert("Failed to save resume. Please try again.")
  }
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    console.log("Initializing application...")

    const savedState = localStorage.getItem("resumeData")
    if (savedState) {
      state = JSON.parse(savedState)
      updateUI()

      goToStep(state.currentStep || 1)
    } else {

      updateUI()

      goToStep(1)
    }


    setupEventListeners()


    updatePreview()

    console.log("Application initialized successfully")
  } catch (error) {
    console.error("Error initializing application:", error)
  }
})

updatePreview()

