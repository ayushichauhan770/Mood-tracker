export const savePersonalityResponse = (questionId, answer) => {
    try {
        const responses = JSON.parse(localStorage.getItem('personality-test-responses') || '{}');
        // Convert answer to integer (0-3) for analysis logic
        // Assuming answer is '1', '2', '3', '4' string, we convert to 0, 1, 2, 3
        const numericAnswer = parseInt(answer) - 1;
        responses[questionId] = numericAnswer;
        localStorage.setItem('personality-test-responses', JSON.stringify(responses));
    } catch (error) {
        console.error('Error saving personality response:', error);
    }
};

export const clearPersonalityResponses = () => {
    localStorage.removeItem('personality-test-responses');
};
