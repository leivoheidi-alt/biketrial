import { siteSettings } from './siteSettings'
import { homepage } from './homepage'
import { clubPage } from './clubPage'
import { beginnerCourse } from './beginnerCourse'
import { bikefestPage } from './bikefestPage'
import { programItem } from './programItem'
import { sponsorPackage } from './sponsorPackage'
import { trialSectionSponsor } from './trialSectionSponsor'
import { exhibitor } from './exhibitor'
import { partnerHighlight } from './partnerHighlight'
import { skateJamBlock } from './skateJamBlock'

export const schemaTypes = [
  // Singleton / settings
  siteSettings,
  homepage,
  clubPage,
  bikefestPage,

  // Standalone documents
  beginnerCourse,
  programItem,
  sponsorPackage,
  trialSectionSponsor,
  exhibitor,
  partnerHighlight,
  skateJamBlock,
]
