function stringtoColor(input: string) {
    // Create a simple hash of the input string
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash); // Basic hash
        hash = hash & hash; // Convert to 32-bit integer
    }

    // Generate RGB components based on the hash
    const randomComponent = (shift: number) => {
        const component = (hash >> shift) & 0xFF; // Extract bits
        return 128 + (component % 128); // Ensure range is 128–255
    };

    const r = randomComponent(16).toString(16).padStart(2, '0');
    const g = randomComponent(8).toString(16).padStart(2, '0');
    const b = randomComponent(0).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}



export default stringtoColor;

