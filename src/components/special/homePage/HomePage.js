"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./HomePage.module.css";

// SVG Icon Components
const SparkleIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0L9.937 15.5z" />
  </svg>
);

const ArrowRightIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14m-7-7l7 7-7 7" />
  </svg>
);

const LinkIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 17H7A5 5 0 0 1 7 7h2m6 0h2a5 5 0 1 1 0 10h-2M8 12h8" />
  </svg>
);

const SmartphoneIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const ShieldIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ZapIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
  </svg>
);

const HeadphonesIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const UserPlusIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m19 8 2 2-2 2" />
    <path d="m21 10-7.5 0" />
  </svg>
);

const GlobeIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m4.93 4.93 4.24 4.24" />
    <path d="m14.83 9.17 4.24-4.24" />
    <path d="m14.83 14.83 4.24 4.24" />
    <path d="m9.17 14.83-4.24 4.24" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const SendIcon = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const TrendingUpIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
    <polyline points="16,7 22,7 22,13" />
  </svg>
);

const BarChartIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="20" x2="12" y2="10" />
    <line x1="18" y1="20" x2="18" y2="4" />
    <line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);

const CheckCircleIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const RocketIcon = ({ className = "w-5 h-5" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index) => {
    console.log("FAQ clicked:", index); // برای تست
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: <LinkIcon className={styles.featureIconSvg} />,
      title: "اتصال مستقیم سامانه مودیان",
      description:
        "ارسال خودکار صورتحساب به سامانه مودیان بدون نیاز به مراجعه حضوری. پیگیری وضعیت فاکتورها و دریافت کد رهگیری از مودیان.",
    },
    {
      icon: <SmartphoneIcon className={styles.featureIconSvg} />,
      title: "صدور فاکتور الکترونیکی ساده",
      description:
        "صدور و ارسال صورتحساب الکترونیکی به سامانه مودیان در چند کلیک. رابط کاربری آسان برای مدیریت فاکتورها و گزارشات مالی.",
    },
    {
      icon: <ShieldIcon className={styles.featureIconSvg} />,
      title: "تایید خودکار از سامانه مودیان",
      description:
        "دریافت خودکار تاییدیه از سامانه مودیان و ذخیره کد رهگیری. امنیت بالا در انتقال اطلاعات مالی و صورتحساب‌ها.",
    },
    {
      icon: <ZapIcon className={styles.featureIconSvg} />,
      title: "ارسال سریع به مودیان",
      description:
        "ارسال فوری صورتحساب به سامانه مودیان و دریافت بازخورد در کمتر از ۳۰ ثانیه. بهینه‌سازی برای سرعت و دقت بالا.",
    },
    {
      icon: <HeadphonesIcon className={styles.featureIconSvg} />,
      title: "پشتیبانی تخصصی مودیان",
      description:
        "راهنمایی کامل برای اتصال به سامانه مودیان و رفع مشکلات ارسال صورتحساب. پشتیبانی ۲۴/۷ از متخصصان مودیان.",
    },
  ];

  const steps = [
    {
      icon: <UserPlusIcon className={styles.stepIconSvg} />,
      number: "1",
      title: "ثبت نام و اتصال به مودیان",
      description:
        "حساب کاربری خود را ایجاد کرده و با استفاده از اطلاعات سامانه مودیان، حساب خود را متصل کنید تا بتوانید صورتحساب ارسال کنید.",
    },
    {
      icon: <GlobeIcon className={styles.stepIconSvg} />,
      number: "2",
      title: "تنظیم اطلاعات مودیان",
      description: `کد اقتصادی و شناسه مودیان خود را در ${process.env.NEXT_PUBLIC_APP_TITLE} وارد کنید تا سیستم به طور خودکار با سامانه مودیان ارتباط برقرار کند.`,
    },
    {
      icon: <SendIcon className={styles.stepIconSvg} />,
      number: "3",
      title: "ارسال صورتحساب به مودیان",
      description:
        "فاکتور خود را ایجاد کرده و با یک کلیک به سامانه مودیان ارسال کنید. کد رهگیری و تاییدیه مودیان را دریافت کنید.",
    },
  ];

  return (
    <>
      <Head>
        <title>
          سامانه مودیان - ارسال خودکار صورتحساب به مودیان |{" "}
          {process.env.NEXT_PUBLIC_APP_TITLE}
        </title>
        <meta
          name="description"
          content="ارسال خودکار صورتحساب به سامانه مودیان، اتصال مستقیم به مودیان، صدور فاکتور الکترونیکی و دریافت کد رهگیری از سامانه مودیان. راه‌حل کامل برای ارتباط با مودیان."
        />
        <meta
          name="keywords"
          content="سامانه مودیان, ارسال صورتحساب به مودیان, اتصال به مودیان, فاکتور الکترونیکی مودیان, کد رهگیری مودیان, صدور فاکتور مودیان, ارسال خودکار مودیان"
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="سامانه مودیان - ارسال خودکار صورتحساب"
        />
        <meta
          property="og:description"
          content="ارسال خودکار صورتحساب به سامانه مودیان و دریافت کد رهگیری در کمتر از ۳۰ ثانیه"
        />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/`} />
      </Head>

      <div className={styles.homepage}>
        {/* Header */}
        <header
          className={`${styles.header} ${
            isScrolled ? styles.headerScrolled : ""
          }`}
        >
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <span className={styles.logoText}>
                {process.env.NEXT_PUBLIC_APP_TITLE}
              </span>
            </div>
            <Link href="/signup" className={styles.ctaBtn}>
              اتصال به مودیان
            </Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.highlight}>سامانه مودیان</span> - ارسال
                خودکار صورتحساب
              </h1>

              <p className={styles.heroSubtitle}>
                ارسال خودکار صورتحساب به سامانه مودیان، دریافت کد رهگیری و
                تاییدیه مودیان در کمتر از ۳۰ ثانیه. با{" "}
                {process.env.NEXT_PUBLIC_APP_TITLE} اتصال مستقیم به مودیان را
                تجربه کنید و فاکتورهای خود را بدون دردسر ارسال کنید.
              </p>

              <div className={styles.heroButtons}>
                <Link href="/signup" className={styles.btnPrimary}>
                  <SparkleIcon className={styles.btnIcon} />
                  اتصال به مودیان
                </Link>
              </div>

              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    <TrendingUpIcon className={styles.statIcon} />
                    +1000
                  </div>
                  <div className={styles.statLabel}>متصل به مودیان</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>
                    <BarChartIcon className={styles.statIcon} />
                    +50K
                  </div>
                  <div className={styles.statLabel}>
                    فاکتور ارسالی به مودیان
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroImage}>
              <div className={styles.mockupContainer}>
                <div className={styles.screenHeader}>
                  <BarChartIcon className={styles.screenHeaderIcon} />
                  <h3>داشبورد سامانه مودیان</h3>
                </div>

                <div className={styles.screenContent}>
                  <div className={styles.statsGrid}>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatNumber}>247</div>
                      <div className={styles.miniStatLabel}>
                        ارسال شده به مودیان
                      </div>
                    </div>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatNumber}>89</div>
                      <div className={styles.miniStatLabel}>
                        کد رهگیری دریافتی
                      </div>
                    </div>
                  </div>

                  <div className={styles.statusBadge}>
                    <CheckCircleIcon className={styles.statusIcon} />
                    <span>متصل به سامانه مودیان</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className={`${styles.floatingElement} ${styles.floatingElement1}`}
              >
                <RocketIcon className={styles.floatingIcon} />
              </div>
              <div
                className={`${styles.floatingElement} ${styles.floatingElement2}`}
              >
                <TrendingUpIcon className={styles.floatingIcon} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={styles.features}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                مزایای اتصال به سامانه مودیان با{" "}
                {process.env.NEXT_PUBLIC_APP_TITLE}
              </h2>
              <p className={styles.sectionSubtitle}>
                تمام امکانات لازم برای ارسال صورتحساب به سامانه مودیان و دریافت
                کد رهگیری در یک پلتفرم
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={styles.featureCard}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className={styles.howItWorks}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                نحوه اتصال به سامانه مودیان
              </h2>
              <p className={styles.sectionSubtitle}>
                در سه گام ساده با سامانه مودیان متصل شوید و شروع به ارسال
                صورتحساب کنید
              </p>
            </div>

            <div className={styles.stepsGrid}>
              {steps.map((step, index) => (
                <div key={index} className={styles.stepCard}>
                  <div className={styles.stepIconContainer}>
                    <div className={styles.stepIcon}>{step.icon}</div>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                سوالات متداول درباره سامانه مودیان
              </h2>
              <p className={styles.sectionSubtitle}>
                پاسخ سوالات رایج درباره اتصال و ارسال صورتحساب به مودیان
              </p>
            </div>

            <div className={styles.faqContainer}>
              <div className={styles.faqItem} onClick={() => toggleFaq(0)}>
                <div className={styles.faqQuestion}>
                  <h3>چطور به سامانه مودیان متصل شوم؟</h3>
                  <div
                    className={`${styles.faqIcon} ${
                      activeFaq === 0 ? styles.active : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaq === 0 ? styles.active : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <p>
                      برای اتصال به سامانه مودیان، کافی است کد اقتصادی و شناسه
                      مودیان خود را وارد کنید. سیستم به طور خودکار اتصال را
                      برقرار می‌کند و وضعیت اتصال را بررسی می‌کند.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.faqItem} onClick={() => toggleFaq(1)}>
                <div className={styles.faqQuestion}>
                  <h3>ارسال صورتحساب به مودیان چقدر طول می‌کشد؟</h3>
                  <div
                    className={`${styles.faqIcon} ${
                      activeFaq === 1 ? styles.active : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaq === 1 ? styles.active : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <p>
                      ارسال صورتحساب به سامانه مودیان کمتر از ۳۰ ثانیه طول
                      می‌کشد و کد رهگیری به طور خودکار دریافت می‌شود. در صورت
                      بروز خطا، سیستم پیام مناسب نمایش می‌دهد.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.faqItem} onClick={() => toggleFaq(2)}>
                <div className={styles.faqQuestion}>
                  <h3>آیا تمام انواع فاکتور قابل ارسال به مودیان است؟</h3>
                  <div
                    className={`${styles.faqIcon} ${
                      activeFaq === 2 ? styles.active : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaq === 2 ? styles.active : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <p>
                      بله، تمام انواع فاکتور فروش، خدمات و سایر صورتحساب‌ها قابل
                      ارسال به سامانه مودیان هستند. سیستم از فرمت‌های مختلف
                      پشتیبانی می‌کند.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.faqItem} onClick={() => toggleFaq(3)}>
                <div className={styles.faqQuestion}>
                  <h3>اگر خطایی در ارسال به مودیان بروز کند چه کنم؟</h3>
                  <div
                    className={`${styles.faqIcon} ${
                      activeFaq === 3 ? styles.active : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaq === 3 ? styles.active : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <p>
                      سیستم خطاهای مربوط به سامانه مودیان را نمایش می‌دهد و تیم
                      پشتیبانی ۲۴/۷ برای رفع مشکل در دسترس است. همچنین راهنمای
                      کاملی برای حل مشکلات رایج ارائه می‌دهیم.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.faqItem} onClick={() => toggleFaq(5)}>
                <div className={styles.faqQuestion}>
                  <h3>امنیت اطلاعات در ارتباط با مودیان چگونه است؟</h3>
                  <div
                    className={`${styles.faqIcon} ${
                      activeFaq === 5 ? styles.active : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`${styles.faqAnswer} ${
                    activeFaq === 5 ? styles.active : ""
                  }`}
                >
                  <div className={styles.faqContent}>
                    <p>
                      تمام اطلاعات با رمزنگاری SSL و بالاترین استانداردهای
                      امنیتی محافظت می‌شود. ارتباط با سامانه مودیان از طریق
                      پروتکل‌های امن و مورد تایید سازمان امور مالیاتی انجام
                      می‌شود.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                همین حالا به سامانه مودیان متصل شوید
              </h2>
              <p className={styles.ctaSubtitle}>
                ارسال خودکار صورتحساب به سامانه مودیان، دریافت کد رهگیری و
                مدیریت کامل فاکتورهای الکترونیکی
              </p>
              <Link href="/signup" className={styles.btnWhite}>
                <RocketIcon className={styles.btnIcon} />
                شروع اتصال به مودیان
                <ArrowRightIcon className={styles.btnIcon} />
              </Link>
            </div>
          </div>
        </section>

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: `${process.env.NEXT_PUBLIC_APP_TITLE} - سامانه مودیان`,
              description:
                "ارسال خودکار صورتحساب به سامانه مودیان و دریافت کد رهگیری",
              url: process.env.NEXT_PUBLIC_BASE_URL,
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "IRR",
                description: "اتصال رایگان به سامانه مودیان",
              },
              featureList: [
                "اتصال مستقیم به سامانه مودیان",
                "ارسال خودکار صورتحساب",
                "دریافت کد رهگیری مودیان",
                "صدور فاکتور الکترونیکی",
              ],
            }),
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
