import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { getDictionary, locales, type Locale } from '@/i18n';
import { ThemeProvider } from '@/app/components/ThemeProvider';

const spaceGroteskBold = localFont({
  src: '../../fonts/SpaceGrotesk-Bold.otf',
  variable: '--font-sg-bold',
});

const spaceGroteskRegular = localFont({
  src: '../../fonts/SpaceGrotesk-Regular.otf',
  variable: '--font-sg-regular',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDictionary(locale);
  return {
    title: d.meta.title,
    authors: [{ name: 'Frederick Kuhrt' }],
    description: d.meta.description,
    manifest: '/manifest.json',
    openGraph: {
      title: d.meta.ogTitle,
      description: d.meta.ogDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = (locales as readonly string[]).includes(locale) ? (locale as Locale) : 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Blocking script — applies .dark before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('nmw-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}` }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
/*




                                                  .+########+
                                         .##   .##########
                                        ###- +##########.  ....
                                       ####.###################.
                                      ######################+.
                                   .############################-
                                .##################################.
                              .#######################################
                            .##########################################-
                           ##############################################
                          ################################################.
                ..--.   .#########           .########.           #########-   ..--.
             ###################                 .+                 ###################.
           ####################                                      -###################
          ####################                                        ####################.
         #######     ########.                                         ########     +######
        -#####-      .#######.          ...               ..           #######+      .######
        ######       ########         #######          .######         ########       ######
        ######       ########        -#######.         ########        ########       +#####
        ######       #########       .#######          ########       .########       ######
        +#####.      -########.        #####            .####.        #########       ######
         ######.      #########.                                     #########.      ######.
         .#######    #########+            #####.   #####.           .#########.   #######+
          .################+              #######  #######.             .################-
            #############+                 #.  ##  ##-  #-                .#############
              ##########                                                    ##########
                 ######                                                      ######.
                -#####-      ###                                    ###      .######
                ######      #.##.                                   #####     ######
                ######.       +##+                                 ###        ######
                ######.        ####                              ####.        ######
                .######         +####.                         #####         #######
                 #######         .######                    -######         .######
                 .#######          #########.          .+########          .######+
                  .#######           ##########################.          ########
                   .#######-            ####################.            ########
                    .########.             .+###########.              ########.
                      ##########                                    .#########
                        ###########                              -##########
                          #############.                     -############
                            .##################-.....+#################+
                               .####################################-
                                   .############################-
                                         .+##############+..

*/
`,
          }}
        />
      </head>
      <body className={`${spaceGroteskBold.variable} ${spaceGroteskRegular.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
