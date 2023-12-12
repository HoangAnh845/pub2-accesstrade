import campaign from "../database/campaign.json" assert { type: "json" }

export const getCampaign = async (req, res) => {
    try {
        res.status(200).json(campaign);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}