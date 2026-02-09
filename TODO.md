## 00- Let's work with a local database. I mean, lets determine some HARDCODED database records for now. 
Let's determine the fields and the values for each field:
We already have the proiperties for this creative. 
We need sizes:
- 945 x 315
- 2160x3840
- 900 x 200
- 1024 x 768
- 640 x 480
- 640 x 960

and ranges:
- <480px
- 480px - 768px
- 768px - 1024px
- 1024px - 1440px
- 1440px - 2000px
- >2000px

And with each of these sizes, attach some overrides randomly to create the database. That way when we operate the app in demo mode to the client, he can see that the information actually changes, and he can have a proper understanding of what is happening and how it works and how it will work in production. 

## 0- overall, let's identify globals with green (same way ranges is purple and size is orange)

## 1-  The properties panel? 
Great. I love it. WEll done. 
Minor changes: 

the overriden property should be:
- field: text-purple-900 bg-purple-50 when it is a range
- field: text-orange-900 bg-orange-50 when it is a size
- container div (relative expanded form-field border border-gray-200 rounded-lg overflow-hidden) should be: border-purple-200 when it is a range and border-orange-200 when it is a size

When i click on add override, it opens a floating menu, but if there properties panel is too short, not tall enough, it has overflow hidden, so the floating menu is not visible and you gotta scroll within the roperties panel. we should fix this. 

In the GLOBAL / RANGES / SIZES selector, (flex-1 px-4 py-2.5 text-sm transition-all capitalize bg-white text-gray-900 border-b-2 border-blue-500) the border should be purple in ranges, orange in sizes and green in globals. Same with the 'expand all' and 'collapse all' buttons. 

If the override is collapsed, when I click on apply , nothing appears to happen, because the floating menu is not visible, because its parent is overflow hidden, so you gonna have to do something similar to what you are doing with the ADD OVERRIDE floating menu. 

The apply to should be Global, Range, Size. 
And Range and Size should let you apply to multiple, like select multiple to apply to. 

## 2 - BEM classes
We should add BEM classes to the elements in the DOM so that we can target them with CSS and JavaScript, and for easier identification of the elements in the DOM for when debugging with humans. Just for identification. You wont go and do EVERY SINGLE ITEM, just the main ones that would make sense.



