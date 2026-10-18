document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('promptInput');
    const sendBtn = document.getElementById('sendBtn');
    const chatDisplay = document.getElementById('chatDisplay');

    // Function to handle video generation request
    const handleGeneration = () => {
        const promptText = promptInput.value.trim();
        if (!promptText) return;

        // 1. Display User Message in Chat Area
        const userMsg = document.createElement('div');
        userMsg.style.cssText = 'margin-bottom: 15px; text-align: right;';
        userMsg.innerHTML = `<span style="background: #2563eb; padding: 10px 15px; border-radius: 12px; display: inline-block; max-width: 70%; text-align: left;">${escapeHTML(promptText)}</span>`;
        chatDisplay.appendChild(userMsg);

        // Clear input box
        promptInput.value = '';
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        // 2. Display AI Loading / Processing Message
        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = 'margin-bottom: 15px; text-align: left;';
        aiMsg.innerHTML = `<span style="background: #1f2937; padding: 10px 15px; border-radius: 12px; display: inline-block; color: #38bdf8;">Reading prompt and rendering video...</span>`;
        chatDisplay.appendChild(aiMsg);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        // 3. Simulate AI video rendering (Generates a mock video output after 3 seconds)
        setTimeout(() => {
            aiMsg.innerHTML = `
                <div style="background: #1f2937; padding: 15px; border-radius: 12px; display: inline-block; max-width: 80%;">
                    <p style="margin-bottom: 10px; color: #f3f4f6; font-size: 0.9rem;">Generated video for: "${escapeHTML(promptText)}"</p>
                    <video controls autoplay style="width: 100%; border-radius: 8px; max-height: 250px;">
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            `;
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }, 3000);
    };

    // Event Listeners for Button Click and Enter key
    sendBtn.addEventListener('click', handleGeneration);
    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleGeneration();
        }
    });

    // Helper to prevent HTML injection
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }
});