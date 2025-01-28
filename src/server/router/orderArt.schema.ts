import { zfd } from 'zod-form-data';

import { z } from 'zod';

export const ZOrderArtInputForm = z.object({
  name: zfd.text(z.string()),
  contactInfo: zfd.text(z.string()),
});

export type OrderArtInputForm = z.infer<typeof ZOrderArtInputForm>;
