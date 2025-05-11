# AI Image Generator

A Next.js application that generates images using Hugging Face's Stable Diffusion XL API.

## Features

- Generate images from text prompts
- Modern and responsive UI
- Real-time image generation
- Error handling and loading states

## Prerequisites

- Node.js 14.x or later
- Hugging Face API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-image-generator
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Hugging Face API key:

```
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a text prompt describing the image you want to generate
2. Click the "Generate Image" button
3. Wait for the image to be generated
4. The generated image will appear below the form

## Technologies Used

- Next.js
- React
- Hugging Face API (Stable Diffusion XL)
- CSS Modules

## License

MIT
