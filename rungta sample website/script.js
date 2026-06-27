document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileDrawer.classList.toggle('active');
            
            // Toggle hamburger icon state
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close drawer on link click
        mobileDrawer.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileDrawer.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    /* ==========================================================================
       ANIMATED SCROLL COUNTERS
       ========================================================================== */
    const stats = document.querySelectorAll('.stat-number');
    let countersActive = false;

    const startCounters = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const updateCount = () => {
                const current = +stat.innerText;
                const increment = Math.ceil(target / 40);
                
                if (current < target) {
                    stat.innerText = Math.min(current + increment, target);
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Scroll listener for stats counter trigger
    const handleScroll = () => {
        const statsCard = document.querySelector('.hero-stats-card');
        if (statsCard && !countersActive) {
            const rect = statsCard.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                startCounters();
                countersActive = true;
                window.removeEventListener('scroll', handleScroll);
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger immediately if already in view

    /* ==========================================================================
       ACADEMIC PATHFINDER LOGIC
       ========================================================================== */
    const steps = document.querySelectorAll('.pf-step');
    const panes = document.querySelectorAll('.pf-pane');
    
    // Selections state
    let selectedStream = '';
    let selectedEligibility = '';

    // Step 1: Click Stream Card
    const streamCards = document.querySelectorAll('.pf-opt-card');
    streamCards.forEach(card => {
        card.addEventListener('click', () => {
            streamCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedStream = card.getAttribute('data-val');
            
            // Advance to Step 2
            goToStep(2);
        });
    });

    // Step 2: Click Eligibility Bar
    const eligibilityBars = document.querySelectorAll('.pf-opt-bar');
    eligibilityBars.forEach(bar => {
        bar.addEventListener('click', () => {
            selectedEligibility = bar.getAttribute('data-val');
            
            // Compute recommendation & Advance to Step 3
            showRecommendation();
            goToStep(3);
        });
    });

    // Step 2 Back Button
    const backToStep1 = document.getElementById('pf-back-to-1');
    if (backToStep1) {
        backToStep1.addEventListener('click', () => {
            goToStep(1);
        });
    }

    // Step 3 Reset Button
    const resetButton = document.getElementById('pf-reset');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            selectedStream = '';
            selectedEligibility = '';
            streamCards.forEach(c => c.classList.remove('selected'));
            goToStep(1);
        });
    }

    const goToStep = (stepNumber) => {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.getAttribute('data-step')) === stepNumber) {
                step.classList.add('active');
            }
        });

        panes.forEach(pane => {
            pane.classList.remove('active');
        });
        document.getElementById(`pf-step-${stepNumber}`).classList.add('active');
    };

    // Pathfinder Recommendation Engine
    const courseRecommendations = {
        'engineering': {
            'twelfth-maths': {
                title: 'Bachelor of Technology (B.Tech) - Computer Science',
                desc: 'Our flagship engineering degree focused on algorithms, software architecture, artificial intelligence, and database designs. Supercharged by placement opportunities at Amazon and Google.',
                duration: '4 Years',
                campus: 'RCET Bhilai / Raipur',
                affiliation: 'CSVTU Bhilai'
            },
            'twelfth-biology': {
                title: 'B.Tech in Biotechnology',
                desc: 'Interdisciplinary program bridging biological systems and computational tools, tailored for bioprocess research and pharma engineering careers.',
                duration: '4 Years',
                campus: 'RCET Bhilai',
                affiliation: 'CSVTU Bhilai'
            },
            'twelfth-commerce': {
                title: 'Bachelor of Computer Applications (BCA)',
                desc: 'Ideal computing course covering front-end development, scripting, and system administrations. Offers direct pathway into technical MNC internships.',
                duration: '3 Years',
                campus: 'GDRCST Bhilai',
                affiliation: 'CSVTU / RISU Bhilai'
            },
            'graduate': {
                title: 'Master of Computer Applications (MCA)',
                desc: 'Advanced post-graduate track specializing in full-stack engineering, cloud architecture, and database operations. Fully supported by placements.',
                duration: '2 Years',
                campus: 'RCET Bhilai',
                affiliation: 'RISU Bhilai / CSVTU'
            }
        },
        'pharmacy': {
            'twelfth-maths': {
                title: 'Bachelor of Pharmacy (B.Pharm)',
                desc: 'Complete program detailing pharmaceutical formulation, organic pharmacology, and regulatory metrics. NAAC A-Grade research labs.',
                duration: '4 Years',
                campus: 'RCPSR Bhilai',
                affiliation: 'CSVTU Bhilai'
            },
            'twelfth-biology': {
                title: 'Bachelor of Pharmacy (B.Pharm)',
                desc: 'Complete program detailing pharmaceutical formulation, organic pharmacology, and regulatory metrics. NAAC A-Grade research labs.',
                duration: '4 Years',
                campus: 'RCPSR Bhilai',
                affiliation: 'CSVTU Bhilai'
            },
            'twelfth-commerce': {
                title: 'Diploma in Pharmacy (D.Pharm)',
                desc: 'Quick eligibility course for retail distribution, community clinics licensing, and drug business pathways.',
                duration: '2 Years',
                campus: 'RCPSR Bhilai',
                affiliation: 'CSVTU Bhilai'
            },
            'graduate': {
                title: 'Master of Pharmacy (M.Pharm)',
                desc: 'Specialized clinical post-grad degree with research disciplines in Pharmaceutics, Pharmacognosy, or Quality Assurance.',
                duration: '2 Years',
                campus: 'RCPSR Bhilai',
                affiliation: 'CSVTU Bhilai'
            }
        },
        'dental': {
            'twelfth-biology': {
                title: 'Bachelor of Dental Surgery (BDS)',
                desc: 'Accredited dentistry curriculum with extensive practical simulation labs and a working campus clinical hospital for real patient contact.',
                duration: '5 Years (inc. Internship)',
                campus: 'RCDSR Bhilai',
                affiliation: 'Ayush University Raipur'
            },
            'graduate': {
                title: 'Master of Dental Surgery (MDS)',
                desc: 'Advanced specialization in Prosthodontics, Orthodontics, or Oral Surgery under expert dental surgeons.',
                duration: '3 Years',
                campus: 'RCDSR Bhilai',
                affiliation: 'Ayush University Raipur'
            },
            'default': {
                title: 'BDS / Dental Sciences Program',
                desc: 'Eligibility requires PCB (Physics, Chemistry, Biology) in Class 12th. Please register for guidance regarding counseling cycles.',
                duration: '5 Years',
                campus: 'RCDSR Bhilai',
                affiliation: 'Ayush University Raipur'
            }
        },
        'science-commerce': {
            'twelfth-maths': {
                title: 'Bachelor of Business Administration (BBA)',
                desc: 'Dynamic undergraduate degree exploring corporate governance, digital marketing, business maths, and human resources.',
                duration: '3 Years',
                campus: 'GDRCST Bhilai',
                affiliation: 'RISU Bhilai'
            },
            'twelfth-biology': {
                title: 'Bachelor of Science (B.Sc) - Microbiology',
                desc: 'Explores laboratory microbiology, biochemistry, and molecular biology. Fully equipped clean-room setups.',
                duration: '3 Years',
                campus: 'GDRCST Bhilai',
                affiliation: 'RISU Bhilai'
            },
            'twelfth-commerce': {
                title: 'Bachelor of Commerce (B.Com) - Computer App',
                desc: 'Combines standard commercial accounting and financial systems training with basic computing/Excel tools.',
                duration: '3 Years',
                campus: 'GDRCST Bhilai',
                affiliation: 'RISU Bhilai'
            },
            'graduate': {
                title: 'Master of Business Administration (MBA)',
                desc: 'Our premier post-graduate management curriculum with specialized concentrations in HR, Finance, and Systems Management. Mapped to top corporate partners.',
                duration: '2 Years',
                campus: 'RCET Bhilai / Raipur',
                affiliation: 'RISU / CSVTU'
            }
        }
    };

    const showRecommendation = () => {
        let recommendation = null;
        
        if (courseRecommendations[selectedStream]) {
            recommendation = courseRecommendations[selectedStream][selectedEligibility];
            
            // Fallback inside selected stream
            if (!recommendation) {
                if (selectedEligibility === 'graduate') {
                    recommendation = courseRecommendations[selectedStream]['graduate'] || courseRecommendations[selectedStream]['twelfth-maths'];
                } else {
                    const keys = Object.keys(courseRecommendations[selectedStream]);
                    recommendation = courseRecommendations[selectedStream][keys[0]];
                }
            }
        }

        // Complete fallback
        if (!recommendation) {
            recommendation = {
                title: 'B.Tech / Professional Degree Program',
                desc: 'Discover tailored pathways across engineering, science, or commerce. Submit an inquiry for counselor evaluation.',
                duration: '3-4 Years',
                campus: 'Bhilai Campus',
                affiliation: 'RISU Bhilai'
            };
        }

        document.getElementById('recommended-title').innerText = recommendation.title;
        document.getElementById('recommended-desc').innerText = recommendation.desc;
        document.getElementById('course-duration').innerText = recommendation.duration;
        document.getElementById('course-campus').innerText = recommendation.campus;
        document.getElementById('course-affiliation').innerText = recommendation.affiliation;
        
        // Link Pathfinder CTA to autofill the form
        const enquireBtn = document.getElementById('pf-enquire-btn');
        if (enquireBtn) {
            enquireBtn.addEventListener('click', () => {
                const selectElement = document.getElementById('student-course');
                if (selectElement) {
                    // Try to match value
                    for (let i = 0; i < selectElement.options.length; i++) {
                        if (recommendation.title.includes(selectElement.options[i].text.split(' (')[0])) {
                            selectElement.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
        }
    };

    /* ==========================================================================
       CRM LOCAL DATABASE & INQUIRY FORM SUBMISSION
       ========================================================================== */
    const inquiryForm = document.getElementById('inquiry-form');
    const formSuccess = document.getElementById('form-success');
    const btnSubmitAnother = document.getElementById('btn-submit-another');

    const saveLeadToCRM = (leadData) => {
        let leads = [];
        try {
            leads = JSON.parse(localStorage.getItem('rungta_crm_leads')) || [];
        } catch (e) {
            leads = [];
        }
        leads.unshift(leadData);
        localStorage.setItem('rungta_crm_leads', JSON.stringify(leads));
        updateCRMCount();
    };

    const validateForm = () => {
        let isValid = true;

        const nameInput = document.getElementById('student-name');
        const emailInput = document.getElementById('student-email');
        const phoneInput = document.getElementById('student-phone');
        const courseSelect = document.getElementById('student-course');
        const stateInput = document.getElementById('student-state');

        // Reset invalid styles
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('invalid'));

        // Name Validation
        if (!nameInput.value.trim()) {
            nameInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            emailInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Phone Validation (10 digit)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneInput.value.trim() || !phoneRegex.test(phoneInput.value)) {
            phoneInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        // Course Validation
        if (!courseSelect.value) {
            courseSelect.parentElement.classList.add('invalid');
            isValid = false;
        }

        // State Validation
        if (!stateInput.value.trim()) {
            stateInput.parentElement.classList.add('invalid');
            isValid = false;
        }

        return isValid;
    };

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateForm()) {
                const name = document.getElementById('student-name').value.trim();
                const email = document.getElementById('student-email').value.trim();
                const phone = document.getElementById('student-phone').value.trim();
                const course = document.getElementById('student-course').value;
                const state = document.getElementById('student-state').value.trim();
                
                const refId = 'RUNG-' + Math.floor(10000 + Math.random() * 90000);
                
                const lead = {
                    refId: refId,
                    name: name,
                    email: email,
                    phone: phone,
                    course: course,
                    state: state,
                    source: 'Web Inquiry Form',
                    timestamp: new Date().toLocaleString()
                };

                // Save Lead
                saveLeadToCRM(lead);
                
                // Show Success
                document.getElementById('ref-id').innerText = refId;
                inquiryForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });
    }

    if (btnSubmitAnother) {
        btnSubmitAnother.addEventListener('click', () => {
            inquiryForm.reset();
            formSuccess.style.display = 'none';
            inquiryForm.style.display = 'block';
        });
    }

    /* ==========================================================================
       FLOATING CHATBOT ASSISTANT
       ========================================================================== */
    const chatToggle = document.getElementById('chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatWindow = document.getElementById('chat-window');
    const chatBody = document.getElementById('chat-body');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBadge = document.getElementById('chat-badge');

    // Bot variables state
    let botStep = 0; // 0: Greeting/Name, 1: Phone, 2: Course selection, 3: Completed
    let leadName = '';
    let leadPhone = '';
    let leadCourse = '';

    const addChatMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg');
        msgDiv.classList.add(sender === 'bot' ? 'bot-msg' : 'user-msg');
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    };

    const processChatInput = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        addChatMessage(text, 'user');
        chatInput.value = '';

        setTimeout(() => {
            if (botStep === 0) {
                leadName = text;
                botStep = 1;
                addChatMessage(`Pleasure to meet you, ${leadName}! Could you please share your 10-digit mobile number so our counselors can call you?`, 'bot');
            } else if (botStep === 1) {
                const phoneRegex = /^[0-9]{10}$/;
                if (phoneRegex.test(text)) {
                    leadPhone = text;
                    botStep = 2;
                    addChatMessage(`Awesome, got it. What course are you most interested in? (e.g. B.Tech, MBA, B.Pharma, BDS)`, 'bot');
                } else {
                    addChatMessage(`Oops, that doesn't seem like a valid 10-digit phone number. Please enter your mobile number again:`, 'bot');
                }
            } else if (botStep === 2) {
                leadCourse = text;
                botStep = 3;
                
                const refId = 'RUNG-BOT-' + Math.floor(1000 + Math.random() * 9000);
                
                const botLead = {
                    refId: refId,
                    name: leadName,
                    email: 'chatbot@rungta-leads.in',
                    phone: leadPhone,
                    course: leadCourse,
                    state: 'Online Chatbot',
                    source: 'Chatbot Interactive',
                    timestamp: new Date().toLocaleString()
                };

                // Save Lead
                saveLeadToCRM(botLead);

                addChatMessage(`Perfect, ${leadName}! I have registered your details for ${leadCourse}. Your inquiry reference ID is <strong>${refId}</strong>. Our counselors will call you soon!`, 'bot');
            } else {
                addChatMessage(`Thank you for chatting with me! Feel free to explore our campus details or submit the inquiry form if you have other requests.`, 'bot');
            }
        }, 800);
    };

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
            if (chatBadge) chatBadge.style.display = 'none'; // Hide badge once opened
        });
    }

    if (chatClose && chatWindow) {
        chatClose.addEventListener('click', () => {
            chatWindow.style.display = 'none';
        });
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', processChatInput);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processChatInput();
            }
        });
    }

    /* ==========================================================================
       ADMIN CRM PORTAL DASHBOARD MODAL
       ========================================================================== */
    const toggleAdmin = document.getElementById('toggle-admin-panel');
    const adminPanel = document.getElementById('admin-panel');
    const adminClose = document.getElementById('admin-close');
    const crmLeadsList = document.getElementById('crm-leads-list');
    const btnClearLeads = document.getElementById('btn-clear-leads');
    const totalLeadsCount = document.getElementById('total-leads-count');
    const latestLeadSource = document.getElementById('latest-lead-source');

    const updateCRMCount = () => {
        let leads = [];
        try {
            leads = JSON.parse(localStorage.getItem('rungta_crm_leads')) || [];
        } catch (e) {
            leads = [];
        }
        
        if (totalLeadsCount) {
            totalLeadsCount.innerText = leads.length;
        }
        if (latestLeadSource && leads.length > 0) {
            latestLeadSource.innerText = leads[0].source;
        } else if (latestLeadSource) {
            latestLeadSource.innerText = 'N/A';
        }
    };

    const renderLeadsTable = () => {
        if (!crmLeadsList) return;

        let leads = [];
        try {
            leads = JSON.parse(localStorage.getItem('rungta_crm_leads')) || [];
        } catch (e) {
            leads = [];
        }

        if (leads.length === 0) {
            crmLeadsList.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">No student inquiries submitted yet. Submit the inquiry form or chat with the bot to log a lead!</td>
                </tr>
            `;
            return;
        }

        crmLeadsList.innerHTML = leads.map(lead => `
            <tr>
                <td><strong>${lead.refId}</strong></td>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone}</td>
                <td><span class="badge-gold">${lead.course}</span></td>
                <td>${lead.state}</td>
                <td><em>${lead.source}</em></td>
                <td>${lead.timestamp}</td>
            </tr>
        `).join('');
    };

    if (toggleAdmin && adminPanel) {
        toggleAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            renderLeadsTable();
            updateCRMCount();
            adminPanel.style.display = 'flex';
        });
    }

    if (adminClose && adminPanel) {
        adminClose.addEventListener('click', () => {
            adminPanel.style.display = 'none';
        });
    }

    if (btnClearLeads) {
        btnClearLeads.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete all captured student leads from the Local Database?')) {
                localStorage.removeItem('rungta_crm_leads');
                renderLeadsTable();
                updateCRMCount();
            }
        });
    }

    // Initialize counts on page load
    updateCRMCount();
});
