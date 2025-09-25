class Chatbot {
    constructor() {
        this.responses = {
            'pengalaman kerja': {
                message: `Saya memiliki pengalaman kerja di beberapa bidang:\n\n1. Outlet Leader PT. Sinar Kreasi Jaya (2024)\n2. Admin Data Sales PT Hasta Ayu Nusantara (2024)\n3. Java Developer indivaragroup.com (2023)\n4. Crew Leader McDonald's (2018-2020)`,
                followUp: ['tugas sebagai outlet leader', 'pengalaman java developer', 'skill data analysis']
            },
            'pendidikan': {
                message: `Latar belakang pendidikan saya:\n\n• S1 Teknik Informatika - Universitas Bhayangkara Jakarta Raya (2017-2023) - IPK 2.98\n• Data Science Bootcamp - Hacktiv8 (2022) - Score 86.2\n• Data Analyst - Binar Academy\n• Project Management - Rumah Siap Kerja`,
                followUp: ['skripsi', 'sertifikat', 'skill teknikal']
            },
            'skill': {
                message: `Technical skills yang saya kuasai:\n\n• Data Analysis & Processing\n• Java Development\n• Python & Machine Learning\n• SQL & Database Management\n• Project Management\n• Web Development (Laravel, JavaScript)`,
                followUp: ['project data analysis', 'pengalaman java', 'sertifikasi']
            },
            'default': {
                message: `Halo! Saya AI assistant untuk portfolio Jhon Kristian Vieri. Anda bisa menanyakan tentang:\n\n• Pengalaman kerja\n• Pendidikan dan sertifikat\n• Technical skills\n• Project yang pernah dikerjakan\n• Atau informasi lainnya`,
                followUp: ['pengalaman kerja', 'pendidikan', 'skill']
            }
        };
        
        this.initializeChatbot();
    }
    
    initializeChatbot() {
        const toggle = document.getElementById('chatbot-toggle');
        const container = document.getElementById('chatbot-container');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-text');
        
        toggle.addEventListener('click', () => {
            container.style.display = container.style.display === 'flex' ? 'none' : 'flex';
        });
        
        closeBtn.addEventListener('click', () => {
            container.style.display = 'none';
        });
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.addMessage('AI: Halo! Ada yang bisa saya bantu?', 'bot');
    }
    
    sendMessage() {
        const input = document.getElementById('chatbot-text');
        const message = input.value.trim().toLowerCase();
        
        if (message) {
            this.addMessage(`You: ${message}`, 'user');
            input.value = '';
            
            setTimeout(() => {
                this.generateResponse(message);
            }, 500);
        }
    }
    
    generateResponse(message) {
        let response = this.responses.default;
        
        // Simple keyword matching
        if (message.includes('kerja') || message.includes('pengalaman') || message.includes('kerja')) {
            response = this.responses['pengalaman kerja'];
        } else if (message.includes('pendidikan') || message.includes('sekolah') || message.includes('kuliah')) {
            response = this.responses.pendidikan;
        } else if (message.includes('skill') || message.includes('keahlian') || message.includes('kemampuan')) {
            response = this.responses.skill;
        } else if (message.includes('java') || message.includes('developer')) {
            response = {
                message: `Pengalaman Java Developer:\n\n• Membangun aplikasi Java end-to-end untuk www.indivaragroup.com\n• Pengembangan sistem web based\n• Memahami OOP dan design patterns`,
                followUp: ['project java', 'skill programming', 'pengalaman kerja lainnya']
            };
        } else if (message.includes('data') || message.includes('analisis')) {
            response = {
                message: `Pengalaman Data Analysis:\n\n• Analisis data sales dan processing\n• Machine Learning untuk klasifikasi customer\n• Visualisasi data dan reporting\n• Tools: Python, SQL, Excel`,
                followUp: ['project data science', 'sertifikat data', 'skill teknikal']
            };
        }
        
        this.addMessage(`AI: ${response.message}`, 'bot');
        
        // Add follow-up questions
        if (response.followUp) {
            setTimeout(() => {
                this.addFollowUpQuestions(response.followUp);
            }, 1000);
        }
    }
    
    addFollowUpQuestions(questions) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const followUpDiv = document.createElement('div');
        followUpDiv.className = 'follow-up-questions';
        
        questions.forEach(question => {
            const btn = document.createElement('button');
            btn.textContent = question;
            btn.className = 'follow-up-btn';
            btn.onclick = () => {
                document.getElementById('chatbot-text').value = question;
                this.sendMessage();
            };
            followUpDiv.appendChild(btn);
        });
        
        messagesContainer.appendChild(followUpDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = text;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
