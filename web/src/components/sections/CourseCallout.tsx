import type { BeginnerCourseRef } from '@/types/sanity'

interface Props {
  course: BeginnerCourseRef
}

export default function CourseCallout({ course }: Props) {
  if (!course?.isActive) return null

  return (
    <div className="bg-[#FF6A00] rounded-2xl p-7 sm:p-8">
      <div className="flex items-start gap-5">
        <div className="text-3xl flex-shrink-0 mt-0.5">📅</div>
        <div className="flex-1">
          <div className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Seuraava alkeiskurssi
          </div>
          <h3
            className="text-3xl sm:text-4xl text-white leading-none mb-4"
            style={{ fontFamily: 'var(--font-anton), Impact, sans-serif', textTransform: 'uppercase', letterSpacing: '0' }}
          >
            {course.startDateText}
          </h3>

          <div className="flex flex-col gap-1.5 text-white/80 text-sm mb-6">
            {course.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{course.location}{course.locationDetail ? ` — ${course.locationDetail}` : ''}</span>
              </div>
            )}
            {course.ageRange && (
              <div className="flex items-center gap-2">
                <span>👶</span>
                <span>{course.ageRange}</span>
              </div>
            )}
            {course.price && (
              <div className="flex items-center gap-2">
                <span>💰</span>
                <span className="font-bold">{course.price}</span>
              </div>
            )}
          </div>

          <a
            href={`mailto:${course.signupCta?.email ?? 'info@biketrial.fi'}`}
            className="inline-flex items-center gap-3 bg-black text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#111111] transition-colors"
          >
            {course.signupCta?.label ?? 'Ilmoittaudu mukaan'}
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  )
}
