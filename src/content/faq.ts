/**
 * Questions families ask. Each answer says where its information comes from:
 * "troop" = the troop's own published information, "scouting" = Scouting
 * America rules that apply to every troop. Anything we don't know yet says so.
 */
export interface Faq {
  q: string
  a: string
  group: 'visit' | 'scouts' | 'parents'
  basis: 'troop' | 'scouting' | 'ask'
}

export const faqs: Faq[] = [
  {
    group: 'visit',
    basis: 'troop',
    q: 'When and where do you meet?',
    a: 'Monday evenings, 6:30 to 8:00, in Milpitas. We don’t post the address publicly. Email us and a leader will send it along with a good night to come.',
  },
  {
    group: 'visit',
    basis: 'scouting',
    q: 'Who can join?',
    a: 'Scouts BSA is for youth ages 11 through 17. Ten-year-olds can join once they’ve earned the Arrow of Light, or from March 1 of their fifth-grade year. Boys join Troop 163 and girls join Troop 2163.',
  },
  {
    group: 'visit',
    basis: 'ask',
    q: 'Can we visit before signing up?',
    a: 'Ask us. Email first so a leader can confirm the place and pick a night with a normal meeting rather than a court of honor or a holiday break.',
  },
  {
    group: 'visit',
    basis: 'scouting',
    q: 'What happens at a meeting?',
    a: 'Most Scouts BSA meetings follow the same rhythm: an opening, time with your patrol, a skill or two, a game and a short closing. Scouts run it. Adults stay in the room and step in when needed.',
  },
  {
    group: 'scouts',
    basis: 'troop',
    q: 'Do I have to know anything already?',
    a: 'No. Our troop motto is “Have fun!” Knots, cooking and fire-building get taught at meetings, and older Scouts help newer ones.',
  },
  {
    group: 'scouts',
    basis: 'scouting',
    q: 'What gear do I need to start?',
    a: 'Don’t buy anything yet. For your first outing you need the Scout Basic Essentials: a first aid kit, water bottle, flashlight, trail food, sun protection, rain gear, extra clothing, a map and compass, matches or fire starter and a pocketknife (once you’ve earned the right to carry one). Ask about loaner gear before you shop.',
  },
  {
    group: 'parents',
    basis: 'ask',
    q: 'How much does it cost?',
    a: 'Scouting America sets the national registration fee each year. Troop dues, campouts and summer camp costs are set locally, and we’ll give you current numbers when you email.',
  },
  {
    group: 'parents',
    basis: 'scouting',
    q: 'What’s expected of parents?',
    a: 'Mostly rides, encouragement and help with a trip or two each year. Any adult who volunteers completes Scouting America’s Youth Protection training first, and two registered adults are present for every activity.',
  },
  {
    group: 'parents',
    basis: 'troop',
    q: 'Who sponsors the troop?',
    a: 'The Rotary Club of Milpitas. Troop 163 started in 1993. Troop 2163, the first all-girl troop in Milpitas, started on March 1, 2019.',
  },
]
