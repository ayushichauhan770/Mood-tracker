const { Astronomy, Observer, Body } = require("astronomy-engine");

const getHoroscope = async (req, res) => {
    try {
        const { birthdate, birthTime, birthLocation } = req.body;

        if (!birthdate || !birthTime || !birthLocation) {
            return res.status(400).json({ message: "Missing birth details" });
        }

        console.log("Generating horoscope for:", { birthdate, birthTime, birthLocation });

        const lat = parseFloat(birthLocation.lat);
        const lng = parseFloat(birthLocation.lng);

        if (isNaN(lat) || isNaN(lng)) {
            console.error("Invalid coordinates:", birthLocation);
            return res.status(400).json({ message: "Invalid birth coordinates" });
        }

        const date = new Date(`${birthdate}T${birthTime}`);
        const observer = new Observer(lat, lng, 0);

        // Helper to get zodiac sign from longitude
        const getZodiacFromLongitude = (long) => {
            const signs = [
                "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
                "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
            ];
            // Normalize longitude to 0-360
            let normalized = long % 360;
            if (normalized < 0) normalized += 360;
            return signs[Math.floor(normalized / 30)];
        };

        // Calculate positions for all major planets
        const bodies = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];
        const positions = {};
        const signs = {};

        for (const bodyName of bodies) {
            // Use Body enum if available, otherwise string
            const body = Body[bodyName] || bodyName;

            try {
                const equData = Astronomy.Equator(body, date, observer, true, true);
                const long = equData.ra * 15; // Convert Right Ascension (hours) to degrees
                positions[bodyName.toLowerCase()] = {
                    longitude: long,
                    sign: getZodiacFromLongitude(long)
                };
                signs[bodyName.toLowerCase() + "Sign"] = getZodiacFromLongitude(long);
            } catch (calcErr) {
                console.error(`Error calculating for ${bodyName}:`, calcErr);
                // Fallback or skip
                positions[bodyName.toLowerCase()] = { longitude: 0, sign: "Unknown" };
                signs[bodyName.toLowerCase() + "Sign"] = "Unknown";
            }
        }

        res.json({
            success: true,
            sunSign: signs.sunSign,
            moonSign: signs.moonSign,
            mercurySign: signs.mercurySign,
            venusSign: signs.venusSign,
            marsSign: signs.marsSign,
            jupiterSign: signs.jupiterSign,
            saturnSign: signs.saturnSign,
            details: positions
        });

    } catch (err) {
        console.error("Horoscope Error:", err);
        res.status(500).json({ message: "Error generating horoscope" });
    }
};

module.exports = { getHoroscope };
