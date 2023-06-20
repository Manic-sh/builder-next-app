import type { AppProps } from 'next/app'
import React, {useEffect, useState, useRef} from 'react';
import { builder, Builder, BuilderComponent, BuilderBlocks, withChildren } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@assets/index.css'
import Cookies from 'js-cookie'
import { Link } from '@components/Link/Link'

import {
  initUserAttributes,
  AsyncConfigurator,
} from '@builder.io/personalization-utils/dist/browser'
// only needed for context menu styling
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'

import * as Collapsible from '@radix-ui/react-collapsible';
import { RowSpacingIcon, Cross2Icon } from '@radix-ui/react-icons';

// Import Swiper React components
import { Swiper, SwiperSlide, Autoplay } from 'swiper/react';

builder.init(builderConfig.apiKey)
builder.apiVersion='v1';

initUserAttributes(Cookies.get())

export default function MyApp({ Component, pageProps }: AppProps) {
  const compRef = React.useRef(null);

  useEffect(() => {
    const comp = document.querySelector('.builder-component-1');
    console.log("Builder Component",  comp);
    console.log("Builder Component using useRef",  compRef.current);
  }, []);
  return (
    <>
      <Component {...pageProps} compRef={compRef} />
      <AsyncConfigurator />
    </>
  )
}

const RichText = (props) => (
  <div className='builder-component-1'>
    <div>{Builder.isEditing? "A": "B"}</div>
    <div>{props.description}</div>
    <div>{props.attributes}</div>
  </div>
);

Builder.registerComponent(
  RichText,
  {
    name: 'RichText',
    inputs: [
      { 
        name: 'description', 
        type: 'richText', 
        defaultValue: '<b>This text is bold</b>'
      }, 
    ],
  }
)
const PricingDetail = (props) => (
  <div>
    <h3>Product Name: {props.pricingDetail}</h3>
    <div>Price: {props.pricingDetail}</div>
    <a href={props.pricingDetail }>View Product</a>
  </div>
);
Builder.registerComponent(
  PricingDetail,
  {
    name: 'PricingCard',

    inputs: [
      {
      name: 'pricingDetail',
      type: 'object',
      defaultValue: {
        title: 'Default Pricing',
        price: 'pr40',
        btnLink: '/registration',
        monthlyPlanProduct: 'pr40000'
      },
      subFields: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'price',
          type: 'string',
          required: true
        },
        {
          name: 'monthlyPlanProduct',
          friendlyName: 'Subscription Plan Product',
          type: 'string',
          defaultValue: 'pr40',
          required: true
        },
        {
          name: 'btnLink',
          type: 'string'
        }
      ],
    },
    ],
  }
)
const Reviews = (props) => (

    <>
    {/* {props.reviews.forEach(element => {
      <div>
          <h3>{element.reviewText}</h3>
          <span>{element.reviewAuthor}</span>
          <img src={element.image} width={300} height={300} />
          </div>
    })} */}
    </>
);

Builder.registerComponent(
  Reviews,
  {
    name: 'Reviews',
    inputs: [
      {
        name: 'reviews',
        type: 'list',
        defaultValue: [ 
              { 
                'component.options.reviewText': 'reviewText'
              }
        ],
        subFields: [
          {
            name: 'reviewText',
            type: 'string',
            defaultValue: '"You are the best"',
          },
          {
            name: 'reviewAuthor',
            type: 'string',
            defaultValue: 'Jane Smith',
          },
          {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['png', 'svg', 'jpg'],
            required: true,
            defaultValue:
          'https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d',
          },
        ],
      }
    ],
  }
)


Builder.register('insertMenu', {
  name: 'Number',
  items: [
    { 
      name: ['range', 'pricingDetail']
    },
  ],
})

const showIfComp = (props) => (
  <div>
    {props.mediaType}
  </div>
);
Builder.registerComponent(showIfComp, 
  {
    name: 'Show If OR', 
  inputs: [
    {
      name: 'mediaType',
      friendlyName: 'Media Type',
      type: 'string',
      defaultValue: 'none',
      required: true,
      enum: ['video', 'image'],
    },
    {
      name: 'image',
      friendlyName: 'Image',
      type: 'file',
      allowedFileTypes: ['jpeg', 'png'],
      localized: true,
      showIf: (options: any) => options.get('mediaType') === 'image' || null,
    },
    {
      name: 'video',
      friendlyName: 'Video',
      type: 'file',
      allowedFileTypes: ['mp4'],
      localized: true,
      showIf: (options: any) => options.get('mediaType') === 'video',
    },
  ]
})

const BodySection3 = ({ header, paragraph1, buttonText, buttonUrl }) => {
  // const Style = styled.div`
  //   ${media.lessThan('medium')`
  //   padding-top: 0px;
  //   `}
  //   ${media.greaterThan('medium')`
  //   padding: 20px 0px;
  //   `}
  // `
  return (
    <>
      <section
        aboutSection
        id="section"
        style={{ margin: '0 auto', maxWidth: '1400px' }}
        small
      >
        {/* <AboutHeader display={2} style={{ margin: '20px 0px' }} align="left">
          About RehabPath.com
        </AboutHeader> */}
        <div className="padd">
          <div
            className="headers"
            style={{ margin: '20px 0px' }}
            id="headers"
            color="black"
          >
            {header}
          </div>
          <div>{paragraph1}</div>
          <div
            style={{
              margin: '20px 0px',
            }}
            
          >
            <div style={{ display: 'flex' }}>
              <a style={{ textDecoration: 'none' }} href={`${buttonUrl}`}>
                <button>{buttonText}</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

Builder.registerComponent(BodySection3, {
  name: 'BodySection3',
  inputs: [
    {
      name: 'header',
      type: 'text',
      defaultValue: 'How to List on RehabPath',
    },
    {
      name: 'paragraph1',
      type: 'text',
      defaultValue:
        'RehabPath directly connects patients with treatment providers. Our goal is to connect the people and providers that are a good fit for each other, allowing both parties to get the most out of the treatment experience. We list any provider treating behavioral health, including substance use, process addiction and mental health disorders located in the United States for free. We also offer paid advertising to further expand your reach.',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Go to Provider Services',
    },
    {
      name: 'buttonUrl',
      type: 'text',
      defaultValue: '/provider-services/',
    },
  ],
})


Builder.registerComponent(
  'EcommerceItem',
  {
    name: 'EcommerceItem',
    noWrap: true,
    inputs: [
      { name: 'ecommerceItem', type: 'reference', model: 'company' },
    ],
    models: [
      'page',
      'blog-post',
    ],
    image:
      'https://tabler-icons.io/static/tabler-icons/icons-png/shopping-cart-plus.png',
  }
);

const CollapsibleDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Collapsible.Root className="CollapsibleRoot" open={open} onOpenChange={setOpen}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="Text" style={{ color: 'white' }}>
          @peduarte starred 3 repositories
        </span>
        <Collapsible.Trigger asChild>
          <button className="IconButton">{open ? <Cross2Icon /> : <RowSpacingIcon />}</button>
        </Collapsible.Trigger>
      </div>

      <div className="Repository">
        <span className="Text">@radix-ui/primitives</span>
      </div>

      <Collapsible.Content>
        <div className="Repository">
          <span className="Text">@radix-ui/colors</span>
        </div>
        <div className="Repository">
          <span className="Text">@stitches/react</span>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};

Builder.registerComponent(CollapsibleDemo, 
  {
    name: 'Collapsible Demo',
});



const Carousel: React.FC<CarouselProps> = ( props ) => {
  const {
    children,
    content,
    builderBlock,
  } = props;
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={24}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {React.Children.map(children, (child, index) => {
        return (<SwiperSlide key={`${index}`}>
          {child}
          <BuilderBlocks
          parentElementId={builderBlock.id}
          style={{
            width: "200px",
            height: "200px",
          }}
          dataPath="component.options.content"
          blocks={content}
        />
          </SwiperSlide>);
      })}
    </Swiper>
  );
};



const CarouselWithChildren = withChildren(Carousel);

Builder.registerComponent(CarouselWithChildren, {
  name: "Carousel",
  inputs: [
    {
      name: "autoplay",
      friendlyName: "Autoplay",
      type: "boolean",
      defaultValue: true,
      helperText: "Enable autoplay",
    },
    {
      name: "slidesPerView",
      friendlyName: "Slides per view",
      type: "string",
      defaultValue: "auto",
      helperText: "Number of slides per view",
      enum: ["auto", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    },
    {
      name: "effect",
      friendlyName: "Effect",
      type: "string",
      defaultValue: "fade",
      enum: ["fade", "creative"],
      showIf: (options: any) => options.get("slidesPerView") === "1",
    },
    {
      name: "spaceBetween",
      friendlyName: "Space between",
      type: "string",
      defaultValue: "24",
      helperText: "Space between slides",
      enum: ["24", "32"],
    },
    {
      name: "content",
      type: "uiBlocks",
      defaultValue: [],
    },
  ],
});
const MyComponent: React.FC<Props> = (props ) => {
   const {
      children,
      content,
      builderBlock,
    } = props;
  return (
    <div
      style={{
        width: "800px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #cccccc",
        color: "#cccccc",
      }}
    >

      {Array.isArray(children) && children.length > 0 ? (
        React.Children.map(children, (child, index) => {
          return (
            <div
              style={{
                width: "200px",
                height: "200px",
              }}
              key={`${index}`}
            >
              {child}
            </div>
          );
        })
      ) : (
         <div>
         {children}
        <BuilderBlocks
          parentElementId={builderBlock.id}
          style={{
            width: "200px",
            height: "200px",
          }}
          dataPath="component.options.content"
          blocks={content}
        />
        </div>
      )}
    </div>
  );
};

const MyComponentWithChildren = withChildren(MyComponent);

Builder.registerComponent(MyComponentWithChildren, {
  name: "MyComponentWithChildren",
  defaultChildren: [
    { 
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Image', options: { src: 'https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2Fc651fbe3cdf34f40958aafe93cd4ffbd' } }
    }
  ],
  inputs: [
   {
     name: "content",
     type: "uiBlocks",
     defaultValue: [],
   },
 ],
});

const VimeoPlayerTracking = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
<script src="https://player.vimeo.com/api/player.js"></script>
<script>
(function() {
   var config = {
      webPagePseudoRoot: "/vimeovideotracking",
      eventPaths: {
         play: "play",
         pause: "pause",
         ended: "finish"
      }
   };

   /* --- NO NEED TO TOUCH ANYTHING BELOW THIS LINE! --- */

   var arrayify = getSelection.call.bind([].slice);

   var vimeoStor = "IFRAME[src^='https://player.vimeo.com/video/']",
      vimeoDOMObjects = document.querySelectorAll(vimeoStor);

   function normalize(eventData) {
      var transformOpts = {
         scale: {
            percent: 100
         },
         round: {
            seconds: 0
         },
         SCALE_NO_SCALE: 1,
         ROUND_2_DIGITS: 2
      };
      normData = {};

      Object.keys(eventData).forEach(function(key) {
         var scaleFactor =
               transformOpts.scale[key] !== undefined
                  ? transformOpts.scale[key]
                  : transformOpts.SCALE_NO_SCALE,
            roundFactor =
               transformOpts.round[key] !== undefined
                  ? transformOpts.round[key]
                  : transformOpts.ROUND_2_DIGITS,
            prePadding = Math.round(
               eventData[key].toFixed(roundFactor) * scaleFactor
            ),
            padFactor = prePadding < 10 ? "0" : ""; // left-pad single digits for easier Marketo matching

         normData[key] = padFactor + prePadding;
      });

      return normData;
   }

   arrayify(vimeoDOMObjects)
      .map(function(vimeoDOMObject) {
         return new Vimeo.Player(vimeoDOMObject);
      })
      .forEach(function(vimeoPlayer) {
         vimeoPlayer.getVideoId().then(function(videoId) {
            ["play", "pause", "ended"].forEach(function(eventType) {
               vimeoPlayer.on(eventType, function(eventData) {
                  var statsNormalized = normalize(eventData);

                  var eventAsPath = [
                     config.webPagePseudoRoot,
                     videoId,
                     config.eventPaths[eventType]
                  ].join("/");

                  var statsAsSearch = ["seconds", "percent"]
                     .map(function(stat) {
                        return [stat, statsNormalized[stat]].join("=");
                     })
                     .join("&");

                  var munchkinPayload = {
                     url: eventAsPath,
                     params: statsAsSearch
                  };

                  Munchkin.munchkinFunction("visitWebPage", munchkinPayload);
               });
            });
         });
      });
})();
</script>
`,
    }}
  />
);

Builder.registerComponent(VimeoPlayerTracking, {
  name: "VimeoPlayerTracking",

});

function Tabs(props) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div
        style={{
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {props.tabs?.map((item, index) => (
          <span
            key={index}
            style={{
              padding: 20,
              color: activeTab === index ? 'blue' : '#000',
            }}
            onClick={() => {
              setActiveTab(index);
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
      {props.tabs?.length && (
        <BuilderBlocks
          parentElementId={props.builderBlock.id}
          dataPath={`component.options.tabs.${activeTab}.content`}
          blocks={props.tabs[activeTab].content}
        />
      )}
    </>
  );
}
// 3. Configure BuilderBlocks. The above section with BuilderBlocks tells Builder what to expect: 
// the parent id, the path to the child component, 
// and what the blocks should be made of. 
// Here, the blocks are made of the content of the active tab 

// 4. Register your component. This component is called Tabs, is of type list and contains two subFields: a label and the content.
// As a best practice, provide a defaultValue. The default label is "Tab 1" and the content is an empty array.

Builder.registerComponent(() => <Tabs />, {
  name: 'Tabs',
  inputs: [
    {
      name: 'tabs',
      type: 'list',
      subFields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'New tab',
        },
        {
          name: 'content',
          type: 'uiBlocks',
          defaultValue: [],
        },
      ],
      defaultValue: [
        {
          label: 'Tab 1',
          content: [],
        },
      ],
    },
  ],
});

const Hero = props => (
  <div>{props.children}</div>
);

// pass your custom component to withChildren()
const HeroWithBuilderChildren = withChildren(Hero)

// specify defaultChildren when you register the component
Builder.registerComponent(HeroWithBuilderChildren, {
  name: 'Hero',
  // Adding defaults is important for easy usability
  defaultChildren: [
    { 
      '@type': '@builder.io/sdk:Element',
      component: { name: 'Text', options: { text: 'I am child text block!' } }
    }
  ]
})

const Component = (props: { mediaType: string, image: file, video: file }) => (
  <div>
  <div>{props.mediaType}</div>
  <img src={props.image} />
  <video src={props.video} />
  </div>
  
  )
  
Builder.registerComponent(Component, {
  name: "component",
  inputs: [
  {
  name: 'mediaType',
  friendlyName: 'Media Type',
  type: 'string',
  defaultValue: 'none',
  required: true,
  enum: ['video', 'image'],
  },
  {
  name: 'image',
  friendlyName: 'Image',
  type: 'file',
  allowedFileTypes: ['jpeg', 'png'],
  localized: true,
  required: true,
  showIf: (options: any, parent) => {
  return options.get('mediaType') === 'image' && parent;
  }
  ,
  },
  {
  name: 'video',
  friendlyName: 'Video',
  type: 'file',
  allowedFileTypes: ['mp4'],
  localized: true,
  showIf: (options: any) => options.get('mediaType') === 'video',
  },
  ]
});


function HeroSymbol(props) {
  return(
  <div>
    <h1 style={{fontSize: '32px', marginBottom: '20px'}}>{props.title}</h1>
    <p>{props.description}</p>
        {props.ctaText.map((element,idx) => (
            <div key={idx} style={{display: 'block', paddingRight: '20px', marginTop:'20px'}}>
              <Link href={element.url}>{element.ctaLabel}</Link>
            </div>
        ))}
  </div>  
  )
}

const HeroWithChildren = withChildren(HeroSymbol)

Builder.registerComponent(HeroWithChildren,
  {
    name: 'Hero Locale Support',
    defaultChildren: [
      { 
        '@type': '@builder.io/sdk:Element',
        component: { name: 'Image', options: { src: 'https://cdn.builder.io/api/v1/image/assets%2Fc782aff3c66f48acb425981b997feb10%2Fc651fbe3cdf34f40958aafe93cd4ffbd' } }
      }
    ],
    inputs: [
      {
      name: 'title',
      type: 'text',
      defaultValue:'Builder.io',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      defaultValue:'The visual headless CMS',
      localized: true,
      required: true,
    },
    {
      name: 'ctaText',
      type: 'list',
      defaultValue: [],
      subFields: [
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue:'Explore',
          localized: true,
          required: true,
        },
        {
          name: 'url',
          type: 'string',
          defaultValue: '',
        },
      ],
    },
    {
      name: 'reverseCta',
      type: 'boolean',
      defaultValue: false,
      localized: true,
    },
    ],
    childRequirements:{
      message: "You can add image or video!",
      query: {
        'component.name': {$in: ['Video', 'Image']},
      },
    },
  }
);


// import { MktFooter } from '@securitize/reactjs-mkt-ui';
// import { useEffect, useState } from 'react';
// import { FOOTER_DISCLAIMER } from '../../data/footer';
// import { getFooterLinks } from '../../data/builderio/footer/get-footer-links';
// import { FooterLinkModel } from '../../data/builderio/footer/footer-link.model';

// export const Footer = () => {
//   const [topBarLinks, setFooterLinks] = useState([] as FooterLinkModel[]);
//   const [isLoading, setLoading] = useState(true);

//   console.log(topBarLinks);

//   useEffect(() => {
//     getFooterLinks().then(data => {
//       setFooterLinks(data);
//       setLoading(false);
//     });
//   }, []);

//   const navigationLinks: any[] = topBarLinks.map(({ data }: any, index) => {
//     return {
//       title: data.label,
//       index,
//       links: data.links?.map((link: any, index: number) => {
//         return {
//           label: link.label,
//           url: link.url,
//           index,
//         };
//       }),
//     };
//   });

//   if (isLoading) {
//     return <span>Loading...</span>;
//   }

//   return (
//     <MktFooter
//       disclaimer={FOOTER_DISCLAIMER}
//       navigationLinks={navigationLinks}
//     />
//   );
// };

const FAQ: FC<Props> = ({
  title,
  description,
  content = [],
  notes,
  action,
  locale,
  attributes,
  builderBlock,
  builderState,
}) => {
  return (<div>{title} {description} {content}</div>)
};

Builder.registerComponent(FAQ, {
  name: 'FAQ',
  inputs: [
    {
      name: 'title',
      friendlyName: 'Title',
      type: 'CatawikiEditor'
    },
    {
      name: 'description',
      friendlyName: 'Description',
      type: 'CatawikiEditor',
      defaultValue: 'Description example',
    },
    {
      name: 'notes',
      friendlyName: 'Notes',
      type: 'CatawikiEditor',
      defaultValue: 'Notes example',
    },
    {
      name: 'content',
      friendlyName: 'Content',
      type: 'list',
      subFields: [
        {
          name: 'title',
          friendlyName: 'Question',
          type: 'CatawikiEditor',
          required: true,
        },
        {
          name: 'content',
          friendlyName: 'Answer',
          type: 'CatawikiEditor',
          required: true,
        },
        { name: 'actionVariant', type: 'string', enum: ['none', 'tertiary'] },
        {
          name: 'actionLabel',
          friendlyName: 'CTA label',
          type: 'CatawikiEditor',
        },
        {
          name: 'actionUrl',
          friendlyName: 'CTA url',
          type: 'CatawikiPlainEditor',
        },
      ],
    },
  ],
  noWrap: true,
});

const Button = (props) => {
  return(<a href={props.link}>{props.text}</a>)
}
Builder.registerComponent(Button, {
  name: 'Button',
  inputs: [
    {
      name: 'text',
      type: 'string',
      required: true,
      defaultValue: 'See more',
    },
    {
      name: 'link',
      type: 'url',
      required: true,
      defaultValue: '/#',
    },
  ],
});