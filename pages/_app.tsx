import type { AppProps } from 'next/app'
import React from 'react';
import { builder, Builder, BuilderComponent, BuilderBlocks, withChildren } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@assets/index.css'
import Cookies from 'js-cookie'
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
  return (
    <>
      <Component {...pageProps} />
      <AsyncConfigurator />
    </>
  )
}

const RichText = (props) => (
  <>
  <div>{props.description}</div>
  <div>{props.attributes}</div>
  </>
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



const Carousel: React.FC<CarouselProps> = ({ children }) => {
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
        return <SwiperSlide key={`${index}`}>{child}</SwiperSlide>;
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