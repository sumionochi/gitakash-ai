import { z } from 'zod'

const formSchema = z.object({
  projectName: z
    .string()
    .min(1, 'Project name is required') // Ensures the field is not empty
    .max(50, 'Project name must be 50 characters or less'), // Limits the project name length
  repositoryUrl: z
    .string()
    .min(1, 'Repository URL is required') // Ensures the field is not empty
    .url('Must be a valid URL') // Validates it as a proper URL
    .regex(
      /^https:\/\/github\.com\/[\w-]+\/[\w-]+$/, // Ensures it matches the GitHub repo URL pattern
      'Must be a valid GitHub repository URL' // Error message for invalid GitHub URLs
    ),
  githubToken: z.string().optional(), // Optional field for GitHub token
})

export type FormValues = z.infer<typeof formSchema>
