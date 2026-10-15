type CvGenerationStage =
  | "rate-limit"
  | "print-url"
  | "browser-launch"
  | "browser-close"
  | "print-page"
  | "assets"
  | "pdf-render"
  | "response-size";

export class CvGenerationError extends Error {
  readonly stage: CvGenerationStage;

  constructor(stage: CvGenerationStage) {
    super("CV generation failed");
    this.stage = stage;
  }
}

export async function atCvStage<T>(
  stage: CvGenerationStage,
  operation: () => T | Promise<T>,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    // Third-party errors can include credentials or request URLs.
    throw error instanceof CvGenerationError
      ? error
      : new CvGenerationError(stage);
  }
}
