import thumbMultiplying from "@/assets/thumb-multiplying.jpg.asset.json";
import thumbSimplifying from "@/assets/thumb-simplifying.jpg.asset.json";
import thumbMistakes from "@/assets/thumb-mistakes.jpg.asset.json";
import thumbIntroFractions from "@/assets/thumb-intro-fractions.jpg.asset.json";
import thumbWordProblems from "@/assets/thumb-word-problems.jpg.asset.json";
import thumbIntroFractionsDark from "@/assets/thumb-intro-fractions-dark.jpg.asset.json";

export type LocalizedText = { en: string; ar: string };

export type VideoQuestion = {
  q: LocalizedText;
  options: LocalizedText[];
  answer: number;
  // Feedback per option — index-aligned with options.
  // Correct option: confirmation. Wrong options: why it's wrong + hint to try again.
  explanations: LocalizedText[];
};

export type LessonVideo = {
  id: string;
  youtubeId: string;
  thumbnail?: string;
  title: LocalizedText;
  duration: LocalizedText;
  status: "done" | "progress" | "todo" | "locked";
  questions: VideoQuestion[];
};

// Shorthand helper for the confirmation feedback (correct answer)
const ok = (en: string, ar: string): LocalizedText => ({ en, ar });

export const lessonVideos: LessonVideo[] = [
  {
    id: "intro-fractions",
    youtubeId: "kZzoVCmUyKg",
    thumbnail: thumbIntroFractionsDark.url,
    title: { en: "Understanding Fractions", ar: "فهم الكسور" },
    duration: { en: "8 min", ar: "٨ دقائق" },
    status: "done",
    questions: [
      {
        q: { en: "What does the denominator represent?", ar: "ماذا يمثل المقام؟" },
        options: [
          { en: "The number of equal parts in the whole", ar: "عدد الأجزاء المتساوية في الكل" },
          { en: "The parts we are counting", ar: "الأجزاء التي نعدّها" },
          { en: "The total sum", ar: "المجموع الكلي" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! The denominator (bottom number) tells us how many equal parts the whole is divided into.", "ممتاز! المقام (الرقم السفلي) يخبرنا بعدد الأجزاء المتساوية التي قُسِّم إليها الكل."),
          { en: "Not quite — that's the numerator (top number). Think about what the bottom number tells us. Try again!", ar: "ليس تماماً — هذا هو البسط (الرقم العلوي). فكّر فيما يخبرنا به الرقم السفلي. حاول مرة أخرى!" },
          { en: "Not quite — a fraction isn't about a total sum. It describes parts of a whole. Try again!", ar: "ليس تماماً — الكسر لا يتعلق بالمجموع الكلي بل بأجزاء من الكل. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Which fraction is equivalent to 1/2?", ar: "أي كسر يساوي ١/٢؟" },
        options: [
          { en: "2/6", ar: "٢/٦" },
          { en: "3/6", ar: "٣/٦" },
          { en: "1/4", ar: "١/٤" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 2/6 simplifies to 1/3, not 1/2. Try again!", ar: "ليس تماماً — ٢/٦ تُبسَّط إلى ١/٣ وليس ١/٢. حاول مرة أخرى!" },
          ok("Excellent! 3/6 = 1/2 because both numerator and denominator can be divided by 3.", "ممتاز! ٣/٦ = ١/٢ لأنه يمكن قسمة البسط والمقام على ٣."),
          { en: "Not quite — 1/4 is half of 1/2, not equal to it. Try again!", ar: "ليس تماماً — ١/٤ هي نصف ١/٢ وليست تساويها. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "3/4 is greater than…", ar: "٣/٤ أكبر من…" },
        options: [
          { en: "5/6", ar: "٥/٦" },
          { en: "1/2", ar: "١/٢" },
          { en: "7/8", ar: "٧/٨" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 5/6 ≈ 0.83 which is bigger than 3/4 = 0.75. Try again!", ar: "ليس تماماً — ٥/٦ ≈ ٠٫٨٣ وهي أكبر من ٣/٤ = ٠٫٧٥. حاول مرة أخرى!" },
          ok("Excellent! 3/4 = 0.75 and 1/2 = 0.5, so 3/4 is indeed greater than 1/2.", "ممتاز! ٣/٤ = ٠٫٧٥ و ١/٢ = ٠٫٥، إذاً ٣/٤ فعلاً أكبر من ١/٢."),
          { en: "Not quite — 7/8 = 0.875 is bigger than 3/4. Try again!", ar: "ليس تماماً — ٧/٨ = ٠٫٨٧٥ وهي أكبر من ٣/٤. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "What does the numerator represent?", ar: "ماذا يمثل البسط؟" },
        options: [
          { en: "The parts we are counting", ar: "الأجزاء التي نعدّها" },
          { en: "The total number of parts", ar: "العدد الكلي للأجزاء" },
          { en: "The whole", ar: "الكل" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! The numerator (top number) shows how many parts we are taking or counting.", "ممتاز! البسط (الرقم العلوي) يبيّن عدد الأجزاء التي نأخذها أو نعدّها."),
          { en: "Not quite — that's the denominator. The numerator sits on top. Try again!", ar: "ليس تماماً — هذا هو المقام. البسط في الأعلى. حاول مرة أخرى!" },
          { en: "Not quite — the whole isn't described by one number of the fraction. Try again!", ar: "ليس تماماً — الكل لا يُمثَّل برقم واحد من الكسر. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Which of these is a proper fraction?", ar: "أيّ من هذه كسر حقيقي؟" },
        options: [
          { en: "5/4", ar: "٥/٤" },
          { en: "3/7", ar: "٣/٧" },
          { en: "9/9", ar: "٩/٩" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 5/4 is improper because the numerator is bigger than the denominator. Try again!", ar: "ليس تماماً — ٥/٤ كسر غير حقيقي لأن البسط أكبر من المقام. حاول مرة أخرى!" },
          ok("Excellent! In 3/7 the numerator is smaller than the denominator — that's a proper fraction.", "ممتاز! في ٣/٧ البسط أصغر من المقام — وهذا كسر حقيقي."),
          { en: "Not quite — 9/9 equals 1, which is a whole, not a proper fraction. Try again!", ar: "ليس تماماً — ٩/٩ تساوي ١ وهي عدد صحيح وليس كسراً حقيقياً. حاول مرة أخرى!" },
        ],
      },
    ],
  },
  {
    id: "multiplying-fractions",
    youtubeId: "CA9XLJpQp3c",
    thumbnail: thumbMultiplying.url,
    title: { en: "Multiplying Fractions", ar: "ضرب الكسور" },
    duration: { en: "10 min", ar: "١٠ دقائق" },
    status: "progress",
    questions: [
      {
        q: { en: "2/3 × 3/4 = ?", ar: "٢/٣ × ٣/٤ = ؟" },
        options: [
          { en: "6/12", ar: "٦/١٢" },
          { en: "1/2", ar: "١/٢" },
          { en: "5/7", ar: "٥/٧" },
        ],
        answer: 1,
        explanations: [
          { en: "Close — 6/12 is the unsimplified result. Simplify it and pick the reduced form. Try again!", ar: "قريب — ٦/١٢ هي الناتج قبل التبسيط. بسّطها واختر الصورة المختصرة. حاول مرة أخرى!" },
          ok("Excellent! 2×3 = 6 and 3×4 = 12, and 6/12 simplifies to 1/2.", "ممتاز! ٢×٣ = ٦ و ٣×٤ = ١٢، و ٦/١٢ تُبسَّط إلى ١/٢."),
          { en: "Not quite — you can't add numerators and denominators. Multiply straight across. Try again!", ar: "ليس تماماً — لا يمكنك جمع البسوط والمقامات. اضرب مباشرة. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "When multiplying fractions you…", ar: "عند ضرب الكسور فإنك…" },
        options: [
          { en: "Add numerators and denominators", ar: "تجمع البسط والمقام" },
          { en: "Multiply numerators together and denominators together", ar: "تضرب البسط ببسط والمقام بمقام" },
          { en: "Cross-multiply", ar: "تضرب بشكل تبادلي" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — adding is for a different operation. Try again!", ar: "ليس تماماً — الجمع لعملية أخرى. حاول مرة أخرى!" },
          ok("Excellent! Multiply top × top and bottom × bottom — that's the rule.", "ممتاز! اضرب البسط في البسط والمقام في المقام — هذه هي القاعدة."),
          { en: "Not quite — cross-multiplying is used to compare fractions, not to multiply them. Try again!", ar: "ليس تماماً — الضرب التبادلي يُستخدم للمقارنة لا للضرب. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "1/2 × 1/2 = ?", ar: "١/٢ × ١/٢ = ؟" },
        options: [
          { en: "1/4", ar: "١/٤" },
          { en: "2/4", ar: "٢/٤" },
          { en: "1/2", ar: "١/٢" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! 1×1 = 1 and 2×2 = 4, so the answer is 1/4.", "ممتاز! ١×١ = ١ و ٢×٢ = ٤، فيكون الناتج ١/٤."),
          { en: "Not quite — you added the numerators instead of multiplying. Try again!", ar: "ليس تماماً — لقد جمعت البسطين بدل ضربهما. حاول مرة أخرى!" },
          { en: "Not quite — multiplying by 1/2 makes the number smaller, not the same. Try again!", ar: "ليس تماماً — الضرب في ١/٢ يجعل العدد أصغر لا مساوياً. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "3/5 × 2 = ?", ar: "٣/٥ × ٢ = ؟" },
        options: [
          { en: "5/10", ar: "٥/١٠" },
          { en: "6/5", ar: "٦/٥" },
          { en: "3/10", ar: "٣/١٠" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — don't multiply the denominator by 2. Write 2 as 2/1 and multiply. Try again!", ar: "ليس تماماً — لا تضرب المقام في ٢. اكتب ٢ على شكل ٢/١ ثم اضرب. حاول مرة أخرى!" },
          ok("Excellent! 3/5 × 2/1 = (3×2)/(5×1) = 6/5.", "ممتاز! ٣/٥ × ٢/١ = (٣×٢)/(٥×١) = ٦/٥."),
          { en: "Not quite — you divided instead of multiplying. Try again!", ar: "ليس تماماً — قسمت بدل الضرب. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Do you need a common denominator to multiply?", ar: "هل تحتاج مقاماً موحّداً للضرب؟" },
        options: [
          { en: "Yes", ar: "نعم" },
          { en: "No", ar: "لا" },
          { en: "Only for mixed numbers", ar: "فقط للأعداد الكسرية" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — a common denominator is only needed for addition and subtraction. Try again!", ar: "ليس تماماً — المقام الموحّد مطلوب فقط للجمع والطرح. حاول مرة أخرى!" },
          ok("Excellent! You just multiply straight across — no common denominator needed.", "ممتاز! تضرب مباشرة — لا حاجة لمقام موحّد."),
          { en: "Not quite — even for mixed numbers you convert to improper fractions and multiply directly. Try again!", ar: "ليس تماماً — حتى مع الأعداد الكسرية تحوّلها إلى كسور غير حقيقية ثم تضرب مباشرة. حاول مرة أخرى!" },
        ],
      },
    ],
  },
  {
    id: "simplifying-fractions",
    youtubeId: "AtBUQH8Tkqc",
    thumbnail: thumbSimplifying.url,
    title: { en: "Simplifying Fractions", ar: "تبسيط الكسور" },
    duration: { en: "7 min", ar: "٧ دقائق" },
    status: "todo",
    questions: [
      {
        q: { en: "Simplify 8/12", ar: "بسّط ٨/١٢" },
        options: [
          { en: "2/3", ar: "٢/٣" },
          { en: "4/6", ar: "٤/٦" },
          { en: "3/4", ar: "٣/٤" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Divide both by 4 (the GCD): 8÷4 = 2, 12÷4 = 3.", "ممتاز! اقسم الاثنين على ٤ (القاسم المشترك الأكبر): ٨÷٤ = ٢، ١٢÷٤ = ٣."),
          { en: "Almost — 4/6 is only partially simplified. Keep dividing until you can't anymore. Try again!", ar: "تقريباً — ٤/٦ مبسَّطة جزئياً فقط. تابع القسمة حتى لا يمكن التبسيط أكثر. حاول مرة أخرى!" },
          { en: "Not quite — 3/4 doesn't equal 8/12. Check by cross-multiplying. Try again!", ar: "ليس تماماً — ٣/٤ لا تساوي ٨/١٢. تحقّق بالضرب التبادلي. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "A fraction is in simplest form when…", ar: "يكون الكسر في أبسط صورة عندما…" },
        options: [
          { en: "The numerator is 1", ar: "يكون البسط ١" },
          { en: "GCD of numerator and denominator is 1", ar: "القاسم المشترك الأكبر بين البسط والمقام هو ١" },
          { en: "The denominator is even", ar: "يكون المقام زوجياً" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 2/3 is simplified but its numerator isn't 1. Try again!", ar: "ليس تماماً — ٢/٣ مبسَّطة لكن بسطها ليس ١. حاول مرة أخرى!" },
          ok("Excellent! When the greatest common divisor is 1, there's nothing left to divide by.", "ممتاز! عندما يكون القاسم المشترك الأكبر ١، لا يبقى ما نقسم عليه."),
          { en: "Not quite — parity of the denominator doesn't determine simplest form. Try again!", ar: "ليس تماماً — كون المقام زوجياً لا يحدد أبسط صورة. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Simplify 10/25", ar: "بسّط ١٠/٢٥" },
        options: [
          { en: "2/5", ar: "٢/٥" },
          { en: "1/3", ar: "١/٣" },
          { en: "5/10", ar: "٥/١٠" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Divide both by 5: 10÷5 = 2, 25÷5 = 5.", "ممتاز! اقسم الاثنين على ٥: ١٠÷٥ = ٢، ٢٥÷٥ = ٥."),
          { en: "Not quite — 1/3 doesn't equal 10/25. Try again!", ar: "ليس تماماً — ١/٣ لا تساوي ١٠/٢٥. حاول مرة أخرى!" },
          { en: "Not quite — 5/10 is not simplified and doesn't equal 10/25 either. Try again!", ar: "ليس تماماً — ٥/١٠ ليست مبسَّطة ولا تساوي ١٠/٢٥. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Simplify 9/27", ar: "بسّط ٩/٢٧" },
        options: [
          { en: "1/3", ar: "١/٣" },
          { en: "3/9", ar: "٣/٩" },
          { en: "1/2", ar: "١/٢" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Divide both by 9 (the GCD): 9÷9 = 1, 27÷9 = 3.", "ممتاز! اقسم الاثنين على ٩ (القاسم المشترك الأكبر): ٩÷٩ = ١، ٢٧÷٩ = ٣."),
          { en: "Almost — 3/9 is equivalent but not fully simplified. Divide again by 3. Try again!", ar: "تقريباً — ٣/٩ مكافئة لكنها ليست مبسَّطة بالكامل. اقسم مرة أخرى على ٣. حاول مرة أخرى!" },
          { en: "Not quite — 1/2 doesn't equal 9/27. Try again!", ar: "ليس تماماً — ١/٢ لا تساوي ٩/٢٧. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Simplify 15/20", ar: "بسّط ١٥/٢٠" },
        options: [
          { en: "3/4", ar: "٣/٤" },
          { en: "5/10", ar: "٥/١٠" },
          { en: "2/3", ar: "٢/٣" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Divide both by 5: 15÷5 = 3, 20÷5 = 4.", "ممتاز! اقسم الاثنين على ٥: ١٥÷٥ = ٣، ٢٠÷٥ = ٤."),
          { en: "Not quite — 5/10 = 1/2 which is not equal to 15/20. Try again!", ar: "ليس تماماً — ٥/١٠ = ١/٢ ولا تساوي ١٥/٢٠. حاول مرة أخرى!" },
          { en: "Not quite — 2/3 doesn't equal 15/20. Try again!", ar: "ليس تماماً — ٢/٣ لا تساوي ١٥/٢٠. حاول مرة أخرى!" },
        ],
      },
    ],
  },
  {
    id: "word-problems",
    youtubeId: "qyW2mWvvtZ8",
    thumbnail: thumbWordProblems.url,
    title: { en: "Word Problems with Fractions", ar: "مسائل كلامية على الكسور" },
    duration: { en: "12 min", ar: "١٢ دقيقة" },
    status: "todo",
    questions: [
      {
        q: { en: "1/2 of a pizza has 8 slices total. How many slices?", ar: "نصف بيتزا مكوّنة من ٨ شرائح. كم شريحة؟" },
        options: [
          { en: "2", ar: "٢" },
          { en: "4", ar: "٤" },
          { en: "6", ar: "٦" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — that's 1/4 of 8, not 1/2. Try again!", ar: "ليس تماماً — هذا ١/٤ من ٨ وليس ١/٢. حاول مرة أخرى!" },
          ok("Excellent! 1/2 × 8 = 4 slices.", "ممتاز! ١/٢ × ٨ = ٤ شرائح."),
          { en: "Not quite — that's 3/4 of 8, not 1/2. Try again!", ar: "ليس تماماً — هذا ٣/٤ من ٨ وليس ١/٢. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "1/3 of 9 apples equals?", ar: "ثلث ٩ تفاحات يساوي؟" },
        options: [
          { en: "2", ar: "٢" },
          { en: "3", ar: "٣" },
          { en: "4", ar: "٤" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 9 ÷ 3 is not 2. Try again!", ar: "ليس تماماً — ٩ ÷ ٣ لا تساوي ٢. حاول مرة أخرى!" },
          ok("Excellent! 9 ÷ 3 = 3.", "ممتاز! ٩ ÷ ٣ = ٣."),
          { en: "Not quite — 9 ÷ 3 = 3, not 4. Try again!", ar: "ليس تماماً — ٩ ÷ ٣ = ٣ وليس ٤. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "You ate 2/5 of a cake. What's left?", ar: "أكلت ٢/٥ من كعكة. كم المتبقي؟" },
        options: [
          { en: "3/5", ar: "٣/٥" },
          { en: "1/5", ar: "١/٥" },
          { en: "2/5", ar: "٢/٥" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! 5/5 − 2/5 = 3/5 left.", "ممتاز! ٥/٥ − ٢/٥ = ٣/٥ المتبقي."),
          { en: "Not quite — 5/5 − 2/5 = 3/5, not 1/5. Try again!", ar: "ليس تماماً — ٥/٥ − ٢/٥ = ٣/٥ وليس ١/٥. حاول مرة أخرى!" },
          { en: "Not quite — 2/5 is what you ate, not what's left. Try again!", ar: "ليس تماماً — ٢/٥ هي ما أكلته وليس المتبقي. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "A rope is 6m. You cut 1/2. Length cut?", ar: "حبل طوله ٦م. قصصت ١/٢. كم الطول؟" },
        options: [
          { en: "2m", ar: "٢م" },
          { en: "3m", ar: "٣م" },
          { en: "4m", ar: "٤م" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — that would be 1/3 of 6. Try again!", ar: "ليس تماماً — هذا ١/٣ من ٦. حاول مرة أخرى!" },
          ok("Excellent! 1/2 × 6 = 3m.", "ممتاز! ١/٢ × ٦ = ٣م."),
          { en: "Not quite — that's 2/3 of 6, not 1/2. Try again!", ar: "ليس تماماً — هذا ٢/٣ من ٦ وليس ١/٢. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "3/4 of 20 students passed. How many?", ar: "٣/٤ من ٢٠ طالباً نجحوا. كم عدد الناجحين؟" },
        options: [
          { en: "12", ar: "١٢" },
          { en: "15", ar: "١٥" },
          { en: "18", ar: "١٨" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — 20 ÷ 4 = 5, then × 3 = 15. Try again!", ar: "ليس تماماً — ٢٠ ÷ ٤ = ٥، ثم × ٣ = ١٥. حاول مرة أخرى!" },
          ok("Excellent! 20 ÷ 4 = 5, and 5 × 3 = 15 students.", "ممتاز! ٢٠ ÷ ٤ = ٥، و ٥ × ٣ = ١٥ طالباً."),
          { en: "Not quite — 18 would be 9/10 of 20, not 3/4. Try again!", ar: "ليس تماماً — ١٨ تمثل ٩/١٠ من ٢٠ وليس ٣/٤. حاول مرة أخرى!" },
        ],
      },
    ],
  },
  {
    id: "common-mistakes",
    youtubeId: "0IU5nrRlnEA",
    thumbnail: thumbMistakes.url,
    title: { en: "Common Mistakes to Avoid", ar: "أخطاء شائعة تجنّبها" },
    duration: { en: "6 min", ar: "٦ دقائق" },
    status: "locked",
    questions: [
      {
        q: { en: "When multiplying fractions, do you need a common denominator?", ar: "عند ضرب الكسور، هل تحتاج مقاماً موحّداً؟" },
        options: [
          { en: "Yes, always", ar: "نعم، دائماً" },
          { en: "No", ar: "لا" },
          { en: "Only if numerators differ", ar: "فقط إذا اختلفت البسوط" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — common denominators are for adding/subtracting, not multiplying. Try again!", ar: "ليس تماماً — المقام الموحّد للجمع/الطرح لا للضرب. حاول مرة أخرى!" },
          ok("Excellent! Multiplication just goes straight across — no common denominator needed.", "ممتاز! الضرب يتم مباشرة — لا حاجة لمقام موحّد."),
          { en: "Not quite — the numerators don't affect this. Try again!", ar: "ليس تماماً — البسوط لا تؤثر هنا. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "1/2 + 1/3 = ?", ar: "١/٢ + ١/٣ = ؟" },
        options: [
          { en: "2/5", ar: "٢/٥" },
          { en: "5/6", ar: "٥/٦" },
          { en: "1/5", ar: "١/٥" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — you can't add numerators and denominators directly. Find a common denominator first. Try again!", ar: "ليس تماماً — لا يمكنك جمع البسوط والمقامات مباشرة. جد مقاماً موحّداً أولاً. حاول مرة أخرى!" },
          ok("Excellent! Common denominator 6: 3/6 + 2/6 = 5/6.", "ممتاز! المقام الموحّد ٦: ٣/٦ + ٢/٦ = ٥/٦."),
          { en: "Not quite — 1/5 is smaller than 1/2 alone. Adding makes it bigger. Try again!", ar: "ليس تماماً — ١/٥ أصغر من ١/٢ وحدها. الجمع يزيد الناتج. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "Is 4/4 equal to 1?", ar: "هل ٤/٤ يساوي ١؟" },
        options: [
          { en: "Yes", ar: "نعم" },
          { en: "No", ar: "لا" },
          { en: "Sometimes", ar: "أحياناً" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Any number divided by itself equals 1.", "ممتاز! أي عدد مقسوم على نفسه يساوي ١."),
          { en: "Not quite — when numerator equals denominator, the fraction always equals 1. Try again!", ar: "ليس تماماً — عندما يساوي البسط المقام يكون الكسر دائماً ١. حاول مرة أخرى!" },
          { en: "Not quite — this is always true, not sometimes. Try again!", ar: "ليس تماماً — هذا صحيح دائماً وليس أحياناً. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "When adding fractions you need…", ar: "عند جمع الكسور تحتاج…" },
        options: [
          { en: "Same numerators", ar: "بسوطاً متساوية" },
          { en: "Same denominators", ar: "مقامات متساوية" },
          { en: "Nothing special", ar: "لا شيء" },
        ],
        answer: 1,
        explanations: [
          { en: "Not quite — numerators can differ; it's the denominators that must match. Try again!", ar: "ليس تماماً — البسوط يمكن أن تختلف؛ المقامات هي التي يجب أن تتساوى. حاول مرة أخرى!" },
          ok("Excellent! To add fractions you first need a common denominator.", "ممتاز! لجمع الكسور تحتاج أولاً إلى مقام موحّد."),
          { en: "Not quite — addition needs a common denominator. Try again!", ar: "ليس تماماً — الجمع يحتاج إلى مقام موحّد. حاول مرة أخرى!" },
        ],
      },
      {
        q: { en: "1 - 1/4 = ?", ar: "١ - ١/٤ = ؟" },
        options: [
          { en: "3/4", ar: "٣/٤" },
          { en: "1/4", ar: "١/٤" },
          { en: "4/4", ar: "٤/٤" },
        ],
        answer: 0,
        explanations: [
          ok("Excellent! Write 1 as 4/4, then 4/4 − 1/4 = 3/4.", "ممتاز! اكتب ١ على شكل ٤/٤، ثم ٤/٤ − ١/٤ = ٣/٤."),
          { en: "Not quite — that's what you subtracted, not what's left. Try again!", ar: "ليس تماماً — هذا ما طرحته لا المتبقي. حاول مرة أخرى!" },
          { en: "Not quite — 4/4 equals 1, but you subtracted 1/4 from it. Try again!", ar: "ليس تماماً — ٤/٤ تساوي ١ لكنك طرحت منها ١/٤. حاول مرة أخرى!" },
        ],
      },
    ],
  },
];

export const getVideo = (id: string) => lessonVideos.find((v) => v.id === id);
