# 💰 Wealth Playground: What Would *You* Do?

Ever wondered what **$200 Billion** *actually* means? Or maybe **$3 Trillion**? These numbers get thrown around, but our brains aren't built to grasp their scale.

This project is an interactive **Allocation Cart** designed to explore the mind-boggling reality of extreme wealth. We put you in charge of a billionaire's fortune or a mega-corporation's market cap and ask: **What will you do with the money?**

Will you fund global initiatives, tackle societal problems, or indulge in some truly absurd luxury? The choice is yours, but the opportunity costs are real.

**The goal?** To make these astronomical sums tangible, spark curiosity, highlight absurd contrasts, and maybe, just maybe, start conversations about wealth, value, and priorities in a fun, engaging, and slightly satirical way.

## ✨ The Ethos: Perspective Through Play

We believe visualizing data can be powerful, especially when dealing with numbers that defy easy comprehension. By framing wealth allocation as an interactive "shopping spree," we aim to:

*   **Reveal Scale:** Show just how far (or not!) these fortunes stretch compared to real-world costs and needs.
*   **Highlight Opportunity Cost:** Juxtapose choices like funding clean water access against buying fleets of superyachts.
*   **Spark "Aha!" Moments:** Use visual metaphors and absurdity to create memorable insights.
*   **Encourage Sharing & Discussion:** Make the comparisons and user choices easily shareable to broaden the conversation.

This isn't about judgment, but about perspective. It's a playground for thought experiments.

## 🤖 Development Story: Vibe Coding with AI

This project started as a spark of an idea and was rapidly scaffolded using **[Bolt.new](https://bolt.new/)**. From there, it was iteratively developed and "vibe coded" within VS Code using **[Cline](https://github.com/SaoudRizwan/cline)**, powered by Google's **Gemini 2.5 Pro** model.

Much of the component structure, visualization logic, API integration, and even the copy you're reading was generated, refactored, and debugged through conversational interaction with the AI. It's been an experiment in AI-assisted development, focusing on translating high-level ideas and feedback into functional code.

## Features

*   **Interactive Allocation Cart:** Choose a billionaire or company and "spend" their fortune on various items.
*   **Dynamic Data:** Fetches real-time(ish) market cap data for companies via Alpha Vantage.
*   **Meaningful Choices:** Allocate funds to globally-focused social good initiatives (clean water, education, hunger relief) or luxury/absurd items (yachts, private islands, buying social media).
*   **Visual Comparisons:**
    *   **GDP Treemap:** See how many countries' GDPs fit inside the selected fortune (using Nivo).
    *   **Global Problems:** Visualize how many times over the fortune could fund solutions to major issues.
    *   **Absurdity Metrics:** Animated infographics showing wealth in relatable/absurd terms (time to spend, minimum wage years, $100 bills end-to-end, weight in gold).
    *   **Wealth Stack:** Animated visualization comparing the physical height of the fortune in $100 bills to Earth/space.
*   **Shareability:** Easily share specific comparisons or your entire "spree" summary.
*   **Responsive Design:** Adapts to different screen sizes.

## Setup & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone [Your Repository URL]
    cd wealth-playground # Or your folder name
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Environment Variables:**
    *   Create a `.env` file in the project root.
    *   Add your Alpha Vantage API key: `VITE_ALPHA_VANTAGE_API_KEY=YOUR_API_KEY_HERE`
    *   *(Ensure `.env` is in your `.gitignore`!)*
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running, typically on `http://localhost:5173`.

## Contributing

This is an open-source project (MIT License). Contributions, feedback, and ideas are highly welcome! Please feel free to open issues or submit pull requests.

*(Areas for contribution: Sourcing accurate data/images, implementing more visualizations, refining UI/UX, adding features like the "Analyze My Spree" summary).*

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
