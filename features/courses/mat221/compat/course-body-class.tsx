'use client';

import { useEffect } from 'react';

export function Mat221CourseBodyClass() {
  useEffect(() => {
    document.body.classList.add('mat221-course-active');
    return () => document.body.classList.remove('mat221-course-active');
  }, []);
  return null;
}
