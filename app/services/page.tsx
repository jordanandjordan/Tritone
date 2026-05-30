import { PrismicRichText } from "@prismicio/react";
import { asLink } from "@prismicio/client";

import Container from "@/components/layout/Container";
import Grid from "@/components/layout/Grid";
import { createClient } from "@/prismicio";

export default async function ServicesPage() {
  const client = createClient();
  const page = await client.getSingle("services");

  const ctaHref = asLink(page.data.cta_link) || "mailto:hello@tritone.com";

  return (
    <main className="min-h-screen text-white">
      <section className="pt-[112px] md:pt-[150px]">
        <Container>
          <Grid className="items-start gap-y-[56px]">
            <div className="col-span-2 md:sticky md:top-[150px] md:col-span-5 md:self-start">
              <h1
                style={{
                  fontSize: "42px",
                  lineHeight: "1.16",
                  letterSpacing: "-0.02em",
                }}
                className="font-founders"
              >
                {page.data.heading}
              </h1>

              <a
                href={ctaHref}
                className="mt-[44px] inline-flex h-[52px] items-center justify-center bg-[#2917E8] px-[30px] font-mono text-[10pt] tracking-[0.02em] text-white transition-opacity hover:opacity-90"
              >
                {page.data.cta_label || "Contact Us"}
              </a>
            </div>

            <div className="col-span-2 md:col-span-5 md:col-start-8">
              <div className="space-y-[40px] pb-[50px] font-mono text-[10px] leading-[1.6] tracking-[0.08em] md:text-[12px] md:pb-[140px]">
                <PrismicRichText
                  field={page.data.body}
                  components={{
                    heading3: ({ children }) => (
                      <h3
                        className="font-founders"
                        style={{
                          marginBottom: "16px",
                          fontSize: "32px",
                          lineHeight: "1.1",
                          letterSpacing: "-0.02em",
                          fontWeight: 400,
                        }}
                      >
                        {children}
                      </h3>
                    ),

                    heading6: ({ children }) => (
                      <div
                        style={{
                          marginTop: "72px",
                          marginBottom: "72px",
                          border: "2px solid white",
                          padding: "30px 36px 36px",
                          maxWidth: "720px",
                        }}
                      >
                        <h6
                          className="font-founders"
                          style={{
                            margin: 0,
                            fontSize: "32px",
                            lineHeight: "0.96",
                            letterSpacing: "-0.03em",
                            fontWeight: 400,
                            color: "white",
                          }}
                        >
                          {children}
                        </h6>
                      </div>
                    ),

                    paragraph: ({ children }) => (
                      <p
                        style={{
                          marginTop: 0,
                           marginBottom: "30px",
                        }}
                      >
                        {children}
                      </p>
                    ),

                    list: ({ children }) => (
                      <ul
                        style={{
                          paddingLeft: "38px",
                        }}
                        className="list-disc space-y-[10px]"
                      >
                        {children}
                      </ul>
                    ),

                    listItem: ({ children }) => <li>{children}</li>,
                  }}
                />

                <a
                  href={ctaHref}
                  className="inline-flex h-[44px] items-center justify-center bg-[#2917E8] px-[42px] font-mono text-[12px] tracking-[0.14em] text-white md:hidden"
                >
                  {page.data.cta_label || "Contact Us"}
                </a>
              </div>
            </div>
          </Grid>
        </Container>
      </section>
    </main>
  );
}