const copy = {
  en: {
    app: {
      ownerName: 'AXEL S',
      notificationMessage:
        'Welcome. If you are reviewing me for a role, the fastest path is: About -> DailyBloom -> CV -> Contact.',
      loading: 'Loading...',
      mobileSwitcherTitle: 'App Switcher',
      noRunningApps: 'No apps open yet.',
      contextMenu: {
        folder: {
          open: 'Open',
          minimize: 'Minimize',
          maximizeRestore: 'Maximize / Restore',
          close: 'Close',
          properties: 'Properties',
        },
        desktop: {
          refreshIcons: 'Refresh Icons',
          switchBackground: 'Switch Background',
          toggleCrt: 'Toggle CRT',
          closeAllWindows: 'Close All Windows',
        },
      },
      propertiesPanel: {
        title: 'Properties',
        fields: {
          name: 'Name',
          open: 'Open',
          minimized: 'Minimized',
          maximized: 'Maximized',
          zIndex: 'Z-Index',
        },
        bool: {
          yes: 'Yes',
          no: 'No',
        },
      },
      folders: {
        about: 'About',
        dailyBloom: 'DailyBloom',
        brand: 'Brand',
        animation: 'Animation',
        illustration: 'Illustration',
        cv: 'CV',
        contact: 'Contact',
        paint: 'Paint App',
        mondrian: 'Mondrian Generator',
        weather: 'Weather',
      },
    },

    navbar: {
      quickActions: {
        about: 'About',
        case: 'Case',
        cv: 'CV',
        apps: 'Apps',
      },
      aria: {
        openAbout: 'Open About window',
        openCase: 'Open case study window',
        openCv: 'Open CV window',
        toggleAppSwitcher: 'Toggle app switcher',
        openContact: 'Open contact window',
        openSettings: 'Open settings',
      },
      dropdown: {
        menu: {
          about: 'ABOUT',
          version: 'VERSION',
          files: 'FILES',
        },
        aboutText:
          'Retro OS portfolio with a clear hiring flow: strategy, craft, execution, and direct contact.',
        versionText: 'Version 2.2 - March 2026',
      },
    },

    settings: {
      refreshFolders: 'Refresh Folders',
      crt: 'CRT',
      on: 'ON',
      off: 'OFF',
      backgrounds: 'Backgrounds',
      classic: 'Classic',
      nighty: 'Nighty',
      aria: {
        classicBackground: 'Classic background',
        nightyBackground: 'Nighty background',
      },
    },

    modal: {
      controls: {
        minimize: 'Minimize {title}',
        maximize: 'Maximize {title}',
        restore: 'Restore {title}',
        close: 'Close {title}',
      },
      status: {
        phoneMode: 'Phone OS mode',
        desktopMode: 'Desktop mode',
        active: 'Active',
        background: 'Background',
      },
    },

    notification: {
      close: 'Close',
      iconAlt: 'PC icon',
    },

    content: {
      about: {
        title: 'User Profile.sys',
        badge: 'Identity',
        avatarAlt: 'Axel portrait',
        name: 'Axel Seara',
        role: 'Art Director · UX/UI · Creative Dev',
        paragraph1:
          'I work as an Art Director focused on visual systems, product storytelling, and hands-on execution. I enjoy combining design craft with practical experimentation in AI-assisted workflows.',
        paragraph2:
          'This portfolio is built to help recruiters review my profile fast: who I am, how I think, what I shipped, and how to contact me.',
      },

      animation: {
        title: 'Animation Archive.exe',
        badge: 'Motion Lab',
        intro:
          'Selected motion projects where concept, direction, and production quality move together.',
        items: [
          {
            title: 'Flaming Cards',
            description:
              'Campaign motion for Pull&Bear with editorial pacing and strong visual rhythm. Tools: Illustrator + After Effects.',
            alt: 'Flaming cards animation',
          },
          {
            title: 'Dreamy Moon',
            description:
              'Launch asset for the Dreamy collection, built with soft transitions and a clear art direction tone.',
            alt: 'Dreamy moon animation',
          },
          {
            title: 'Keytrip',
            description:
              'Hybrid piece mixing frame-by-frame and 3D elements to support brand storytelling.',
            alt: 'Keytrip animation',
          },
          {
            title: '3D Landscape',
            description:
              'Retro-inspired 3D world designed for social visibility and stronger visual recall.',
            alt: '3D landscape animation',
          },
        ],
      },

      brand: {
        title: 'Brand Forge.exe',
        badge: 'Identity Lab',
        intro:
          'Identity projects where I led visual direction, brand tone, and consistency across channels.',
        items: [
          {
            title: 'Time Vortex',
            description:
              'Brand concept for a clothing collection with a retro-digital visual language.',
            alt: 'Time Vortex brand design',
          },
          {
            title: 'Little Dimensional Company',
            description:
              'Second collection identity extension with a cleaner system and reusable assets.',
            alt: 'Little Dimensional Company logo',
          },
          {
            title: 'In Love With',
            description:
              'Campaign logo for an eco-transition narrative, applied across labels and communication assets.',
            alt: 'In Love With logo',
          },
          {
            title: 'Grow is Pleasure',
            description: 'Full identity reboot for an emerging streetwear brand.',
            alt: 'Grow is Pleasure branding',
          },
          {
            title: 'Daily Beats',
            description: 'Logo for an independent radio station in northern Spain.',
            alt: 'Daily Beats logo',
          },
        ],
      },

      illustration: {
        title: 'Illustration Vault.exe',
        badge: 'Visual Archive',
        intro:
          'Illustration and 3D production work for commercial projects, focused on consistency and narrative intent.',
        items: [
          {
            title: 'Napping Dog',
            description:
              '3D character for seasonal displays, from concept to final look development.',
            alt: 'Napping dog illustration',
          },
          {
            title: 'Tracksuit Rabbit',
            description:
              'Companion campaign character with a playful tone and aligned art direction.',
            alt: 'Tracksuit rabbit illustration',
          },
          {
            title: 'Clay Robot',
            description: 'Digital clay-style visual exploration for merchandising contexts.',
            alt: 'Clay robot illustration',
          },
          {
            title: 'The Angry Wizard',
            description: 'Character asset prepared for animation and in-store visual systems.',
            alt: 'Angry wizard illustration',
          },
          {
            title: 'Skull & Snake',
            description: 'Editorial-style graphic artwork for apparel.',
            alt: 'Skull and snake illustration',
          },
          {
            title: 'Cartoon Dog',
            description: 'Old-school character style adapted for kids product lines.',
            alt: 'Cartoon dog illustration',
          },
          {
            title: 'Walking Eyes',
            description: 'Expressive concept piece within a larger apparel graphic series.',
            alt: 'Walking eyes illustration',
          },
        ],
      },

      dailyBloom: {
        title: 'Daily Bloom.app',
        badge: 'UX/UI Case',
        intro:
          'Core case study where I led UX/UI and frontend implementation. Goal: create a daily-use social memory experience that feels simple, clear, and sticky over time.',
        items: [
          {
            title: 'Card Interface',
            description: 'Daily prompt discovery through a playful flip-card mechanic.',
          },
          {
            title: 'Dashboard',
            description: 'Clear information architecture for profile, categories, and activity.',
          },
          {
            title: 'Scroll Interaction',
            description: 'Feed behavior tuned for hierarchy, readability, and smooth flow.',
          },
          {
            title: 'Share Menu',
            description:
              'Micro-interactions for sharing, aligned with the product visual language.',
          },
        ],
        videoFallback: 'Your browser does not support the video tag.',
      },

      cv: {
        title: 'CV Download Utility.exe',
        intro: 'Quick PDF download for interview review.',
        button: 'Download CV',
      },

      contact: {
        title: 'Mail Client 98.exe',
        badge: 'Inbox',
        actions: {
          newMessage: 'New Message',
          copyEmail: 'Copy Email',
        },
        foldersTitle: 'Folders',
        folders: {
          inbox: 'Inbox',
          sent: 'Sent',
          drafts: 'Drafts',
          archive: 'Archive',
        },
        contactLabel: 'Contact',
        contactNote: 'Best channel for interviews and project opportunities.',
        status: {
          label: 'Status',
          ready: 'Ready.',
          copied: 'Email copied to clipboard.',
        },
      },

      paint: {
        title: 'Paint Station.exe',
        badge: 'Sketch Mode',
        actions: {
          eraser: 'Eraser',
          clear: 'Clear',
          savePng: 'Save PNG',
        },
        intro:
          'Simple sketch space for quick ideation. I use it to test composition before moving into production work.',
        brushColor: 'Brush Color',
        brushSize: 'Brush Size',
        colorAria: 'Select color {color}',
      },

      mondrian: {
        title: 'Mondrian Atelier',
        actions: {
          remix: 'Remix',
          reset: 'Reset',
          close: 'Close',
        },
        info: 'A compact visual playground inspired by De Stijl. I use it to test rhythm, contrast, and composition in generative layouts.',
        controlsTitle: 'Composition Controls',
        columns: 'Columns',
        rows: 'Rows',
        tip: 'Tip: fewer rows/columns creates bolder layouts. More density creates richer patterns.',
      },

      weather: {
        title: 'Weather Station Console',
        badge: 'Live Feed',
        actions: {
          currentLocation: 'Current Location',
          close: 'Close',
        },
        errors: {
          serviceNotConfigured: 'Weather service is not configured.',
          fetchFailed: 'Could not load weather data right now.',
          noGeolocation: 'Your browser does not support geolocation.',
          locationDenied: 'Location access denied. Keeping preset cities.',
        },
        info: 'Small experimental app to show real-time data in a retro UI style.',
        loading: 'Syncing atmospheric data...',
        ranges: {
          title: 'Temperature Range',
          min: 'Min',
          max: 'Max',
        },
        airQuality: {
          title: 'Air Quality',
          labels: {
            good: 'Good',
            fair: 'Fair',
            moderate: 'Moderate',
            poor: 'Poor',
            veryPoor: 'Very Poor',
            na: 'N/A',
          },
          notes: {
            good: 'Clean air',
            fair: 'Acceptable conditions',
            moderate: 'Sensitive people: take care',
            poor: 'Limit outdoor activity',
            veryPoor: 'Better to stay indoors',
            na: 'No data',
          },
        },
      },
    },
  },
};

export const DEFAULT_LOCALE = 'en';

export const getCopy = (locale = DEFAULT_LOCALE) => copy[locale] || copy[DEFAULT_LOCALE];

export default copy;
